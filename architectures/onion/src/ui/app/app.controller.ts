import { Controller } from '@nestjs/common'
import { TypedRoute } from '@nestia/core'
import typia, { tags } from 'typia'
import { BaseResponse } from '../common/base-response'

@Controller()
export class AppController {
  constructor() {}

  @TypedRoute.Get()
  getHello(): BaseResponse<IHelloResponse> {
    return new BaseResponse({ data: typia.random<IHelloResponse>() })
  }

  //   @TypedRoute.Get(':id')
  //   async getHelloById(
  //     @TypedParam('id')
  //     id: number & tags.Minimum<0> & tags.Maximum<9> & tags.Type<'int32'>,
  //   ): Promise<BaseResponse<IIdentifierRequest>> {
  //     return new BaseResponse({ data: { id } })
  //   }
}

export interface IHelloResponse {
  code: number & tags.Minimum<0> & tags.Maximum<100> & tags.Type<'int32'>
  email: string & tags.Format<'email'>
  uuid: string & tags.Format<'uuid'>
}

export interface IIdentifierRequest {
  id: number & tags.Minimum<0> & tags.Maximum<9> & tags.Type<'int32'>
}
