import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryitemDto {
  @ApiProperty({
    example: '«20 минут до конца ноября»',
    description: 'title work',
  })
  readonly title: string;

  @ApiProperty({
    example: 'холст / масло',
    description: 'info for work',
  })
  readonly info: string;

  @ApiProperty({
    example: '160×80',
    description: 'size for work',
  })
  readonly size: string;

  @ApiProperty({ example: '1', description: 'position image from gallery' })
  readonly order: number;

  @ApiProperty({ example: '1', description: 'width image' })
  readonly width: number;

  @ApiProperty({ example: '1', description: 'height image' })
  readonly height: number;

  @ApiProperty({ example: 'url', description: 'photo gallery' })
  readonly photo: string;

  @ApiProperty({ example: '1', description: 'user id' })
  readonly userId: number;
}
