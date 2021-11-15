import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface GalleryitemAttrs {
  title: string;
  info: string;
  order: number;
  width: number;
  height: number;
  size: string;
  userId: number;
  photo: string;
}

@Table({ tableName: 'galleryitem' })
export class Galleryitem extends Model<Galleryitem, GalleryitemAttrs> {
  @ApiProperty({ example: '1', description: 'uniq id users' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '«20 минут до конца ноября»',
    description: 'title work',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'холст / масло',
    description: 'info for work',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  info: string;

  @ApiProperty({
    example: '160×80',
    description: 'size for work',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  size: string;

  @ApiProperty({ example: '1', description: 'position image from gallery' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @ApiProperty({ example: '1', description: 'width image' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  width: number;

  @ApiProperty({ example: '1', description: 'height image' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  height: number;

  @ApiProperty({ example: 'url', description: 'photo gallery' })
  @Column({ type: DataType.STRING, allowNull: false })
  photo: string;

  @ApiProperty({ example: '1', description: 'user id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
