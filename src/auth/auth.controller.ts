import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { swaggerDoc } from '../common/decorators/swagger-doc.decorator';
import { AccessLoginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @swaggerDoc('auth')
  @Post('login')
  login(@Body() accessLoginDto: AccessLoginDto) {
    return this.authService.login(accessLoginDto);
  }
}
