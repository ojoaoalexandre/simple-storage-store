import { Prisma, Product } from '@prisma/client'
import { database } from '../../lib/prisma'
import { ProductsRepository } from '../products.repository'

export class PrismaProductsRepository implements ProductsRepository {
  async find(): Promise<Product[]> {
    const products = await database.product.findMany()

    return products
  }

  async findById(id: string): Promise<Product | null> {
    const product = await database.product.findUnique({
      where: {
        id,
      },
    })

    if (product) {
      return product
    }

    return null
  }

  async create({
    title,
    description,
    price,
  }: Prisma.ProductCreateInput): Promise<boolean> {
    const product = await database.product.create({
      data: {
        title,
        description,
        price,
      },
    })

    if (product) {
      return true
    }

    return false
  }

  async delete(id: string): Promise<boolean> {
    const product = await database.product.delete({
      where: {
        id,
      },
    })

    if (product) {
      return true
    }

    return false
  }
}
