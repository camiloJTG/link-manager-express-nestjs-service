import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AccessLoginDto } from './dto';
import { User } from './entities/user.entity';
import { jwtResponseInterface, jwtPayloadInterface } from './interfaces';

@Injectable()
export class AuthService {
  private readonly jwtExpires = this.configService.get<string>('JWT_EXPIRES');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(accessLoginDto: AccessLoginDto): Promise<jwtResponseInterface> {
    const { email, password } = accessLoginDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const hash = await bcrypt.compare(password, user.password);
    if (!hash) throw new BadRequestException('Invalid credentials');

    const { id, username } = user;
    const token = this.generateToken({ id, username, email });
    return { token, expired: this.jwtExpires };
  }

  generateToken(payload: jwtPayloadInterface): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
