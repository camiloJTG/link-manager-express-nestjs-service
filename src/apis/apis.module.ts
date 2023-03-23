import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UnsplahService } from './unsplash.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [UnsplahService],
  exports: [UnsplahService],
})
export class ApisModule {}
