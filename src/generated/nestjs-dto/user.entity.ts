
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Favorite} from './favorite.entity'
import {Bookmark} from './bookmark.entity'


export class User {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
mail_address: string ;
password: string ;
@ApiProperty({
  enum: Role,
})
role: Role ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
updatedAt: Date ;
Favorite?: Favorite[] ;
Bookmark?: Bookmark[] ;
}
