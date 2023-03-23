import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { Link } from './entities/link.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ApisModule } from 'src/apis/apis.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
    ConfigModule,
    AuthModule,
    ApisModule,
    CommonModule,
  ],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [TypeOrmModule, LinkService],
})
export class LinkModule {}
