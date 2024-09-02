import { Schema } from '@effect/schema'
import { Effect, pipe } from 'effect'
import { Api, RouterBuilder } from 'effect-http'
import { NodeRuntime } from '@effect/platform-node'
import { NodeServer } from 'effect-http-node'

// Define the response schema for the user endpoint
const UserResponse = Schema.Struct({
  name: Schema.String,
  id: pipe(Schema.Number, Schema.int(), Schema.positive()),
})

type UserResponse = typeof UserResponse.Type

// Define the request query schema for the getUser endpoint
const GetUserQuery = Schema.Struct({ id: Schema.NumberFromString })
// Create an instance of the Effect HTTP API
const api = pipe(
  Api.make({ title: 'Users API' }),
  Api.addEndpoint(
    pipe(
      Api.get('getUser', '/user'),
      Api.setResponseBody(UserResponse),
      Api.setRequestQuery(GetUserQuery),
    ),
  ),
)

const app = pipe(
  RouterBuilder.make(api),
  RouterBuilder.handle('getUser', ({ query }) => Effect.succeed({ name: 'milan', id: query.id })),
  RouterBuilder.build,
)

// remaining code
app.pipe(NodeServer.listen({ port: 3000 }), NodeRuntime.runMain)
