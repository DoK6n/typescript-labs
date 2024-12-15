import { Elysia, Static, t } from 'elysia'

export const idParamSchema = t.Object({
  id: t.String(),
})

export const idParamDto = new Elysia({ name: 'Dto.param.id' }).model({
  'param.id': idParamSchema,
})

export type IdParamDto = Static<typeof idParamSchema>
