import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LinkService } from './link.service';
import { CreateLinkDto, UpdateLinkDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { swaggerDoc } from 'src/common/decorators/swagger-doc.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @swaggerDoc('post')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @swaggerDoc('get')
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  findAllByUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.linkService.findAllByUser(id, paginationDto);
  }

  @swaggerDoc('get')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.linkService.findOne(id);
  }

  @swaggerDoc('patch')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return this.linkService.update(id, updateLinkDto);
  }

  @swaggerDoc('delete')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.linkService.remove(id);
  }
}
