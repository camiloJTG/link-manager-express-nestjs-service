import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { swaggerDoc } from 'src/common/decorators/swagger-doc.decorator';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @swaggerDoc('seed')
  @ApiTags('seed')
  @Get()
  runSeed() {
    return this.seedService.runSeed();
  }
}
