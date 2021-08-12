import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import { FilesModule } from "../files/files.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET',
          signOptions: {
              expiresIn: '5h'
          }
      }),
      FilesModule,
      forwardRef(() => UsersModule),
  ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
