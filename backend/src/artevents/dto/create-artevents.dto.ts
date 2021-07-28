import {ApiProperty} from "@nestjs/swagger";

export class CreateArteventsDto {
    @ApiProperty({example: 'ТВОЕ МЕСТО У МАСЛЁНКИ', description: 'title artevents'})
    readonly title: string;

    @ApiProperty({example: 'выставка РАБОТ АНДРЕЯ САМОЗВАННОГО', description: 'subtitle artevents'})
    readonly subtitle: string;

    @ApiProperty({example: '22 — 34 СЕНТЯБРЯ 2021', description: 'date artevents'})
    readonly dateEvent: string;

    @ApiProperty({example: '15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik 3', description: 'mainImage artevents'})
    readonly mainImage: string;

    @ApiProperty({example: 'Первые годы биографии Айвазовского прошли в бедности в результате разорения', description: 'second title artevents'})
    readonly secondTitle: string;

    @ApiProperty({example: '["имназию Симферополя. Увлечен", "{"image": "15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik 3"}", "имназию Симферополя. Увлечен"]', description: 'content: json string'})
    readonly content: string[];
}