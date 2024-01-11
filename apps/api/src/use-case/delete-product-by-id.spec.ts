import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../repository/errors/resource-not-found.error'
import { InMemoryProductsRepository } from '../repository/in-memory/in-memory-products.repository'
import { DeleteProductByIdUseCase } from './delete-product-by-id'

let repository: InMemoryProductsRepository
let sut: DeleteProductByIdUseCase

const title = 'A title of example'
const description = 'A description of example'
const price = 50

describe('Delete product by id', () => {
  beforeEach(() => {
    repository = new InMemoryProductsRepository()
    sut = new DeleteProductByIdUseCase(repository)
  })

  it('should be able to delete a product', async () => {
    const createProduct = await repository.create({
      title,
      description,
      price,
    })

    const { product } = await sut.execute({
      id: createProduct.id,
    })

    expect(product).toEqual(true)
  })

  it('should not be able to delete a product if not exists', async () => {
    await expect(() =>
      sut.execute({
        id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
