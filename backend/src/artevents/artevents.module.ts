import { Module } from '@nestjs/common';
import { ArteventsService } from './artevents.service';
import { ArteventsController } from './artevents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artevents } from './artevents.model';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [ArteventsService],
  controllers: [ArteventsController],
  imports: [SequelizeModule.forFeature([Artevents]), FilesModule],
  exports: [ArteventsService],
})
export class ArteventsModule {}
