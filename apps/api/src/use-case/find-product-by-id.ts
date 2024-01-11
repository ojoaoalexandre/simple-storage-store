import { Product } from '@prisma/client'
import { ProductsRepository } from '../repository/products.repository'

type FindProductByIdUseCaseRequest = {
  id: string
}

type FindProductByIdUseCaseResponse = {
  product: Product | null
}

export class FindProductByIdUseCase {
  constructor(readonly productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: FindProductByIdUseCaseRequest): Promise<FindProductByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(id)

    return {
      product,
    }
  }
}
