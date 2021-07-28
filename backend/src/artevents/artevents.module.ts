import { Module } from '@nestjs/common';
import { ArteventsService } from './artevents.service';
import { ArteventsController } from './artevents.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Artevents} from "./artevents.model";

@Module({
  providers: [ArteventsService],
  controllers: [ArteventsController],
  imports: [
    SequelizeModule.forFeature([Artevents])
  ],
  exports:[
    ArteventsService
  ]
})
export class ArteventsModule {}
