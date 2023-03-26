import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    type: 'string',
    minLength: 1,
    maxLength: 50,
    required: true,
    description: 'title of the link to be saved',
    example: 'Youtube',
  })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  title: string;

  @ApiProperty({
    type: 'url',
    example: 'https://www.youtube.com',
    required: true,
    description: 'URL of the website to be saved',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    type: 'string',
    minLength: 10,
    maxLength: 50,
    required: false,
    description: 'Brief description of the saved link',
    example: 'Link to watch at night :D',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(10)
  description: string;

  @ApiProperty({
    type: 'boolean',
    required: true,
    description: 'If its a favorite link or not',
  })
  @IsBoolean()
  isFavorite: boolean;

  @ApiProperty({
    type: 'uuid',
    required: true,
    description: 'uuid of the user who saves the link',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsUUID()
  userId: string;
}
