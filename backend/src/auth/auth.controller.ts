import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'login user' })
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Registration user' })
  @Post('/registration')
  @UseInterceptors(FileInterceptor('photo'))
  registration(@Body() userDto: CreateUserDto, @UploadedFile() photo) {
    return this.authService.registration(userDto, photo);
  }

  @ApiOperation({ summary: 'Save image for event' })
  @Post('/save-image')
  @UseInterceptors(FileInterceptor('photo'))
  saveImage(@Body() eventName: string, @UploadedFile() photo) {
    return this.authService.saveImage(photo, 'user-folder');
  }
}
