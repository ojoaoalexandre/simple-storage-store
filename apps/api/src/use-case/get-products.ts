import { Product } from '@prisma/client'
import { ProductsRepository } from '../repository/products.repository'

type GetProductsResponse = {
  products: Product[]
}

export class GetProducts {
  constructor(readonly productsRepository: ProductsRepository) {}

  async execute(): Promise<GetProductsResponse> {
    const products = await this.productsRepository.find()

    return {
      products,
    }
  }
}
