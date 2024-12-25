import { Controller } from '@nestjs/common'
import { TypedRoute } from '@nestia/core'
import typia, { tags } from 'typia'
import { BaseResponse } from '../common/base-response'

@Controller()
export class AppController {
  constructor() {}

  @TypedRoute.Get()
  getRandomData(): BaseResponse<RandomData> {
    return new BaseResponse({ data: typia.random<RandomData>() })
  }
}

interface RandomData {
  code: number & tags.Minimum<0> & tags.Maximum<100> & tags.Type<'int32'>
  email: string & tags.Format<'email'>
  uuid: string & tags.Format<'uuid'>
}
