import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Galleryitem } from './galleryitem.model';
import { CreateGalleryitemDto } from './dto/create-galleryitem.dto';
import { FilesService } from '../files/files.service';
import { UsersService } from '../users/users.service';
import { UpdateGalleryitemDto } from './dto/update-galleryitem.dto';

@Injectable()
export class GalleryitemService {
  constructor(
    @InjectModel(Galleryitem) private galerryitemRepository: typeof Galleryitem,
    private fileService: FilesService,
    private userService: UsersService,
  ) {}

  async create(dto: CreateGalleryitemDto, email) {
    const candidateEmail = await this.userService.getUsersByEmail(email);
    const item = await this.galerryitemRepository.create({
      ...dto,
      userId: candidateEmail.id,
    });
    return item;
  }

  async saveImage(image, eventName) {
    const photo = await this.fileService.createFile(image, eventName.eventName);

    return photo;
  }

  async update(id: number, user: string, updateItem: UpdateGalleryitemDto) {
    console.log('update-start');
    console.log(updateItem);
    const candidateEmail = await this.userService.getUsersByEmail(user);
    const workPerson = await this.getOneWork(id);
    if (candidateEmail.id === workPerson.userId) {
      for (const workPersonKey in updateItem) {
        console.log('for start');
        workPerson[workPersonKey] = updateItem[workPersonKey];
        console.log(workPerson);
        console.log(updateItem);
        console.log(workPersonKey);
        console.log(updateItem.order);
        console.log('for end');
      }
      await workPerson.save();
      console.log('workPersonKey update end');
      return workPerson;
    } else {
      throw new HttpException('нет доступа', HttpStatus.UNAUTHORIZED);
    }
  }

  async getOneWork(id: number) {
    const singleWork = await this.galerryitemRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return singleWork;
  }
}
