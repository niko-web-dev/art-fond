import { ApiProperty } from "@nestjs/swagger";

export class CreateGalleryitemDto{
  @ApiProperty({example: '«20 минут до конца ноября»', description: 'title work'})
  readonly title: string

  @ApiProperty({example: 'холст / масло <b>160×80</b>', description: 'info for work'})
  readonly info: string

  @ApiProperty({example: '1', description: 'position image from gallery'})
  readonly order: number

  @ApiProperty({example: 'url', description: 'photo gallery'})
  readonly photo: string

  @ApiProperty({example: '1', description: 'user id'})
  readonly userId: number
}