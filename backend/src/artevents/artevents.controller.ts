import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ArteventsService} from "./artevents.service";
import {CreateArteventsDto} from "./dto/create-artevents.dto";
import {Artevents} from "./artevents.model";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('Artevents')
@Controller('artevents')
export class ArteventsController {

    constructor(private eventService: ArteventsService) {}

    @ApiOperation({summary: 'Create artevents'})
    @ApiResponse({status: 200, type: Artevents})
    @Post()
    create(@Body() dto: CreateArteventsDto){
        return this.eventService.createEvents(dto)
    }

    @ApiOperation({summary: 'Save image for event'})
    @Post('/save-image')
    @UseInterceptors(FileInterceptor('photo'))
    saveImage(@Body() eventName: string, @UploadedFile() photo){
        return this.eventService.saveImage(photo, eventName)
    }

    @ApiOperation({summary: 'Get all events'})
    @Get()
    getAll(){
        return this.eventService.getAllEvents()
    }

    @ApiOperation({summary: 'Get one events'})
    @ApiResponse({status: 200, type: Artevents})
    @Get('/:id')
    getOneUser(@Param('id') id: number){
        return this.eventService.getOneEvent(id)
    }
}
