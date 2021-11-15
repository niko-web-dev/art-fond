import {
  Body,
  Controller,
  Param,
  Put,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateGalleryitemDto } from './dto/create-galleryitem.dto';
import { GalleryitemService } from './galleryitem.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as Path from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdateGalleryitemDto } from './dto/update-galleryitem.dto';

@ApiTags('Gallery item')
@Controller('galleryitem')
export class GalleryitemController {
  constructor(private galleryitemService: GalleryitemService) {}

  @ApiOperation({ summary: 'Create gallery item' })
  @UseGuards(JwtAuthGuard)
  @Post()
  createGalleryitem(@Body() dto: CreateGalleryitemDto, @Req() req) {
    return this.galleryitemService.create(dto, req.user);
  }

  @ApiOperation({ summary: 'Save image for event' })
  @UseGuards(JwtAuthGuard)
  @Post('/save-image')
  @UseInterceptors(FileInterceptor('photo'))
  saveImage(@Body() eventName: string, @UploadedFile() photo) {
    return this.galleryitemService.saveImage(photo, 'event-folder');
  }

  @ApiOperation({ summary: 'Create gallery item' })
  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateGalleryitem(
    @Param('id') id: number,
    @Req() req,
    @Body() galleryDto: UpdateGalleryitemDto,
  ) {
    return this.galleryitemService.update(id, req.user, galleryDto);
  }
}
