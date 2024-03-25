import fastifyJwt from '@fastify/jwt'
import server from 'fastify'
import { routeProducts } from './http/products/route'
import { routeUsers } from './http/users/route'
import { env } from './lib/env'

export const app = server()

app.register(fastifyJwt, {
  secret: env.JWT
})

app.register(routeUsers, {
  prefix: '/api'
})

app.register(routeProducts, {
  prefix: '/api'
})
