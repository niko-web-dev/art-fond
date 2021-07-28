import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto{
    @ApiProperty({example: 'ADMIN', description: 'new role (ADMIN or USER)'})
    readonly value: string;

    @ApiProperty({example: '1', description: 'user id'})
    readonly userId: number
}