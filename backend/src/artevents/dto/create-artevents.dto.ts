import { ApiProperty } from '@nestjs/swagger';

export class CreateArteventsDto {
  @ApiProperty({
    example: 'ТВОЕ МЕСТО У МАСЛЁНКИ',
    description: 'title artevents',
  })
  readonly title: string;

  @ApiProperty({
    example: 'выставка РАБОТ АНДРЕЯ САМОЗВАННОГО',
    description: 'subtitle artevents',
  })
  readonly subtitle: string;

  @ApiProperty({
    example: '22 — 34 СЕНТЯБРЯ 2021',
    description: 'date artevents',
  })
  readonly dateEvent: string;

  @ApiProperty({
    example: '15_AkemiTakeya_LemonismXActionism_mumok_33(c)KarolinaMiernik 3',
    description: 'mainImage artevents',
  })
  readonly mainImage: string;

  @ApiProperty({
    example:
      'Первые годы биографии Айвазовского прошли в бедности в результате разорения',
    description: 'second title artevents',
  })
  readonly secondTitle: string;

  @ApiProperty({
    example:
      '["имназию Симферополя. Увлечен", "{"image":{"src":"http://localhost:5000/efd19cca-acf3-4ac7-a855-8241e82b1d56.jpg", "name": "выстовочный зал «безгрешный» <br /><span>фотография</span> ВАЛЕНТИН ПОКОЯННЫЙ"}}", "имназию Симферополя. Увлечен"]',
    description: 'content: json string',
  })
  readonly content: string[];
}
