import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'test@test.ru', description: 'email user'})
    readonly email: string;

    @ApiProperty({example: 'test123', description: 'login user'})
    readonly login: string;

    @ApiProperty({example: 'testPassword!', description: 'password user'})
    readonly password: string;

    @ApiProperty({example: '[{"phone": "+78005553535"}]', description: 'Array contacts user'})
    readonly contacts: string[];

    @ApiProperty({example: '[{"school": "Moscow city, school 17"}]', description: 'Array education user'})
    readonly education: string[];

    @ApiProperty({example: 'lorem ipsum', description: 'info for education user'})
    readonly educationInfo: string;

    @ApiProperty({example: 'Moscow', description: 'city user'})
    readonly city: string;

    @ApiProperty({example: '2021-07-27T19:53:09.152Z', description: 'Birghday user, string '})
    readonly birthday: string;

    @ApiProperty({example: 'url', description: 'photo user'})
    readonly photo: string;
}