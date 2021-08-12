import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateGalleryitemDto } from "./dto/create-galleryitem.dto";
import { GalleryitemService } from "./galleryitem.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Gallery item')
@Controller('galleryitem')
export class GalleryitemController {

  constructor(private galleryitemService: GalleryitemService) {
  }

  @ApiOperation({summary: 'Create gallery item'})
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  createGalleryitem(@Body() dto: CreateGalleryitemDto, @UploadedFile() photo){
    return this.galleryitemService.create(dto, photo)
  }

}
