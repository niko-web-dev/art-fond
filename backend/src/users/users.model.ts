import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCreationAttrs {
    email: string,
    login: string,
    password: string,
    contacts: string[],
    education: string[],
    city: string,
    birthday: string,
    photo: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example: '1', description: 'uniq id users'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'test@test.ru', description: 'email user'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'test123', description: 'login user'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @ApiProperty({example: 'testPassword!', description: 'password user'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: '[{"phone": "+78005553535"}]', description: 'Array contacts user'})
    @Column({type: DataType.ARRAY(DataType.TEXT), unique: true, allowNull: false})
    contacts: string[];

    @ApiProperty({example: '[{"school": "Moscow city, school 17"}]', description: 'Array education user'})
    @Column({type: DataType.ARRAY(DataType.TEXT), allowNull: false})
    education: string[];

    @ApiProperty({example: 'lorem ipsum', description: 'info for education user'})
    @Column({type: DataType.TEXT, allowNull: false})
    educationInfo: string;

    @ApiProperty({example: 'Moscow', description: 'city user'})
    @Column({type: DataType.STRING, allowNull: false})
    city: string;

    @ApiProperty({example: '2021-07-27T19:53:09.152Z', description: 'Birghday user, format ISO string'})
    @Column({type: DataType.STRING, allowNull: false})
    birthday: string;

    @ApiProperty({example: 'url', description: 'photo user'})
    @Column({type: DataType.STRING, allowNull: false})
    photo: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}