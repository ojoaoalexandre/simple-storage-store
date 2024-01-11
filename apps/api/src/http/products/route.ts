import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/jwt'
import { getProductsController } from './get-products.controller'

export const routeProducts = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.get('/products', getProductsController)
  app.get('/products/:id', getProductsController)
  app.post('/products', getProductsController)
  app.put('/products/:id', getProductsController)
  app.delete('/products/:id', getProductsController)
}
