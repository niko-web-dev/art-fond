import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { User } from "../users/users.model";



interface GalleryitemAttrs {
  title: string
  info: string
  order: number
  userId: number
  photo: string
}

@Table({tableName: 'galleryitem'})
export class Galleryitem extends Model<Galleryitem, GalleryitemAttrs>{
  @ApiProperty({example: '1', description: 'uniq id users'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '«20 минут до конца ноября»', description: 'title work'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: 'холст / масло <b>160×80</b>', description: 'info for work'})
  @Column({type: DataType.STRING, allowNull: false})
  info: string;

  @ApiProperty({example: '1', description: 'position image from gallery'})
  @Column({type: DataType.INTEGER, allowNull: false})
  order: number;

  @ApiProperty({example: 'url', description: 'photo gallery'})
  @Column({type: DataType.STRING, allowNull: false})
  photo: string;

  @ApiProperty({example: '1', description: 'user id'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  author: User
}