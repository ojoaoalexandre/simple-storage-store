import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaProductsRepository } from '../../repository/prisma/prisma-products.repository'
import { GetProducts } from '../../use-case/get-products'

export const getProductsController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  try {
    const repository = new PrismaProductsRepository()
    const getProducts = new GetProducts(repository)

    const { products } = await getProducts.execute()

    return response.status(200).send({
      products,
    })
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
