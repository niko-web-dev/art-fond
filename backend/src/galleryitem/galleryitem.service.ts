import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Galleryitem } from "./galleryitem.model";
import { CreateGalleryitemDto } from "./dto/create-galleryitem.dto";
import { FilesService } from "../files/files.service";

@Injectable()
export class GalleryitemService {
  constructor(@InjectModel(Galleryitem) private galerryitemRepository: typeof Galleryitem, private fileService: FilesService) {
  }

  async create(dto: CreateGalleryitemDto, image) {
    const fileName = await this.fileService.createFile(image)
    const item = await this.galerryitemRepository.create({...dto, photo: (String)(fileName)})
    return item;
  }

}
