import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';
import { CommonService } from 'src/common/common.service';
import { jwtResponseInterface } from './interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  private readonly hashtSalt = this.configService.get<number>('HASH_SALT');
  private readonly jwtExpires = this.configService.get<string>('JWT_EXPIRES');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<jwtResponseInterface> {
    try {
      const { password, ...rest } = createUserDto;
      const hash = await bcrypt.hash(password, this.hashtSalt);
      const user = this.userRepository.create({ password: hash, ...rest });
      await this.userRepository.save(user);

      const { id, email, username } = user;
      const token = this.authService.generateToken({ id, username, email });
      return { token, expired: this.jwtExpires };
    } catch (error) {
      this.commonService.handlerError(error);
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User not found`);
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users.length === 0) throw new NotFoundException('User not found');
    return users;
  }

  async deleteAll(): Promise<void> {
    await this.userRepository.delete({});
  }
}
