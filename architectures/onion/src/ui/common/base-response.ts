import { tags } from 'typia'

export class BaseResponse<T = unknown> {
  code: number & tags.Minimum<0> & tags.Maximum<5000> & tags.Type<'int32'>
  data?: T
  error?: string
  cause?: unknown

  constructor(props: Partial<BaseResponse<T>>) {
    this.code = props.code ?? 2000
    this.data = props.data
    this.error = props.error
    this.cause = props.cause
  }
}
