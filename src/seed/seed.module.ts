import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { LinkModule } from 'src/link/link.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, ConfigModule, LinkModule],
})
export class SeedModule {}
