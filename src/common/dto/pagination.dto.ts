import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How many row do you need',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 1,
    description: 'How many row do you to skip',
  })
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  offset?: number;
}
