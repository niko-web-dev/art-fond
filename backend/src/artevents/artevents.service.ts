import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Artevents } from './artevents.model';
import { CreateArteventsDto } from './dto/create-artevents.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class ArteventsService {
  constructor(
    @InjectModel(Artevents) private eventRepository: typeof Artevents,
    private fileService: FilesService,
  ) {}

  async createEvents(dto: CreateArteventsDto): Promise<Artevents> {
    const newEvent = await this.eventRepository.create(dto);
    return newEvent;
  }

  async getAllEvents(): Promise<Artevents[]> {
    const allEvents = await this.eventRepository.findAll();
    return allEvents;
  }

  async getOneEvent(id: number) {
    const singleEvent = await this.eventRepository.findOne({
      where: { id },
    });

    return singleEvent;
  }

  async saveImage(image, eventName) {
    const photo = await this.fileService.createFile(image, eventName.eventName);
    return photo;
  }
}
