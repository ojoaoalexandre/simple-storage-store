import { ResourceNotFoundError } from '../repository/errors/resource-not-found.error'
import { ProductsRepository } from '../repository/products.repository'

type DeleteProductByIdUseCaseRequest = {
  id: string
}

type DeleteProductByIdUseCaseResponse = {
  product: boolean
}

export class DeleteProductByIdUseCase {
  constructor(readonly productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: DeleteProductByIdUseCaseRequest): Promise<DeleteProductByIdUseCaseResponse> {
    const product = await this.productsRepository.delete(id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return { product }
  }
}
