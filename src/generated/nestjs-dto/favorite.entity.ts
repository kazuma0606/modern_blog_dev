
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {Page} from './page.entity'


export class Favorite {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
userId: number  | null;
user?: User  | null;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
pageId: number ;
page?: Page ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
}
