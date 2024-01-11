import { Prisma, Product } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ProductsRepository } from '../products.repository'

export class InMemoryProductsRepository implements ProductsRepository {
  private products: Product[] = []

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id)

    if (product) {
      return product
    }

    return null
  }

  async create({
    title,
    description,
    price,
  }: Prisma.ProductCreateInput): Promise<Product> {
    const product = {
      id: randomUUID(),
      title,
      description,
      price,
    }

    this.products.push(product)

    return product
  }

  async delete(id: string): Promise<boolean> {
    const productIndex = this.products.findIndex((product) => product.id === id)

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1)

      return true
    }

    return false
  }

  async find(): Promise<Product[]> {
    return this.products
  }
}
