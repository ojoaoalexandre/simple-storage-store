import fastifyJwt from '@fastify/jwt'
import server from 'fastify'
import { routeUsers } from './http/users/route'
import { env } from './lib/env'
import { routeProducts } from './http/products/route'

export const app = server()

app.register(fastifyJwt, {
  secret: env.JWT,
})

app.register(routeUsers, {
  prefix: '/api',
})

app.register(routeProducts, {
  prefix: '/api',
})
