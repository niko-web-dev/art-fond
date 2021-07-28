import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface ArteventsCreationAttrs {
    title: string,
    subtitle: string,
    dateEvent: string,
    mainImage: string,
    secondTitle: string,
    content: string[]
}

@Table({tableName: 'artevents'})
export class Artevents extends Model<Artevents, ArteventsCreationAttrs>{
    @ApiProperty({example: '1', description: 'uniq id users'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ТВОЕ МЕСТО У МАСЛЁНКИ', description: 'title artevents'})
    @Column({type: DataType.TEXT, allowNull: false})
    title: string;

    @ApiProperty({example: 'выставка РАБОТ АНДРЕЯ САМОЗВАННОГО', description: 'subtitle artevents'})
    @Column({type: DataType.TEXT, allowNull: false})
    subtitle: string;

    @ApiProperty({example: '22 — 34 СЕНТЯБРЯ 2021', description: 'date artevents'})
    @Column({type: DataType.TEXT, allowNull: false})
    dateEvent: string;

    @ApiProperty({example: '15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik 3', description: 'mainImage artevents'})
    @Column({type: DataType.TEXT, allowNull: false})
    mainImage: string;

    @ApiProperty({example: 'Первые годы биографии Айвазовского прошли в бедности в результате разорения', description: 'second title artevents'})
    @Column({type: DataType.TEXT, allowNull: false})
    secondTitle: string;

    @ApiProperty({example: '["имназию Симферополя. Увлечен", "{"image": "15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik 3"}", "имназию Симферополя. Увлечен"]', description: 'content: json string'})
    @Column({type: DataType.ARRAY(DataType.TEXT), allowNull: false})
    content: string[];
}