import { Module } from '@nestjs/common';
import { GalleryitemService } from './galleryitem.service';
import { GalleryitemController } from './galleryitem.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Galleryitem } from "./galleryitem.model";
import { FilesModule } from "../files/files.module";

@Module({
  providers: [GalleryitemService],
  controllers: [GalleryitemController],
  imports: [
    SequelizeModule.forFeature([User, Galleryitem]),
    FilesModule
  ],
  exports: [

  ]
})
export class GalleryitemModule {}
