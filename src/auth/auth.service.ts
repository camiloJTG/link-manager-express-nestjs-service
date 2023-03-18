import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommonService } from 'src/common/common.service';
import { AccessLoginDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { jwtResponse, jwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  private readonly hastSalt = this.configService.get<number>('HASH_SALT');
  private readonly jwtExpires = this.configService.get<string>('JWT_EXPIRES');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<jwtResponse> {
    try {
      const { password, ...rest } = createUserDto;
      const hash = await bcrypt.hash(password, this.hastSalt);
      const user = this.userRepository.create({ password: hash, ...rest });
      await this.userRepository.save(user);

      const { id, email, username } = user;
      const token = this.generateToken({ id, username, email });
      return { token, expired: this.jwtExpires };
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async login(accessLoginDto: AccessLoginDto): Promise<jwtResponse> {
    const { email, password } = accessLoginDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const hash = await bcrypt.compare(password, user.password);
    if (!hash) throw new BadRequestException('Invalid credentials');

    const { id, username } = user;
    const token = this.generateToken({ id, username, email });
    return { token, expired: this.jwtExpires };
  }

  private generateToken(payload: jwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
