
import {Status} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Favorite} from './favorite.entity'
import {Bookmark} from './bookmark.entity'


export class Page {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
contents_id: number ;
title: string ;
pages: string ;
@ApiProperty({
  enum: Status,
})
status: Status ;
tags: string[] ;
description: string  | null;
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
