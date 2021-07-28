import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthController} from './auth/auth.controller';
import {AuthService} from './auth/auth.service';
import {AuthModule} from './auth/auth.module';
import {ArteventsModule} from './artevents/artevents.module';
import {Artevents} from "./artevents/artevents.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, Artevents, UserRoles],
            autoLoadModels: true
        }),
        ArteventsModule,
        UsersModule,
        RolesModule,
        AuthModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],

})

export class AppModule {
}