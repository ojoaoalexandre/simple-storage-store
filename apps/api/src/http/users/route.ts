import { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate.controller'
import { registerController } from './register.controller'

export const routeUsers = async (app: FastifyInstance) => {
  app.post('/register', registerController)
  app.post('/auth', authenticateController)
}
