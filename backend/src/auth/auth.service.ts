import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private fileService: FilesService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto, image) {
    const candidateEmail = await this.userService.getUsersByEmail(
      userDto.email,
    );
    const candidateLogin = await this.userService.getUsersByLogin(
      userDto.login,
    );
    console.log(candidateEmail || candidateLogin);
    if (candidateEmail || candidateLogin) {
      throw new HttpException(
        'Пользователь существует',
        HttpStatus.UNAUTHORIZED,
      );
      return;
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async saveImage(image, eventName) {
    const photo = await this.fileService.createFile(image, eventName.eventName);
    return photo;
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
    };
    return {
      token: await this.jwtService.signAsync(payload),
      login: user.login,
      email: user.email,
      id: user.id,
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUsersByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    console.log(passwordEquals);
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'password or login uncorrect' });
  }
}
