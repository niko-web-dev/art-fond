import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto{
    @ApiProperty({example: 'test123', description: 'login user'})
    readonly login: string;

    @ApiProperty({example: 'testPassword!', description: 'password user'})
    readonly password: string;
}