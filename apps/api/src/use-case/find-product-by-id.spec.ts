import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repository/in-memory/in-memory-products.repository'
import { FindProductByIdUseCase } from './find-product-by-id'

let repository: InMemoryProductsRepository
let sut: FindProductByIdUseCase

const title = 'A title of example'
const description = 'A description of example'
const price = 50

describe('Find Product By id', () => {
  beforeEach(() => {
    repository = new InMemoryProductsRepository()
    sut = new FindProductByIdUseCase(repository)
  })

  it('should be able find a product by id', async () => {
    const createProduct = await repository.create({
      title,
      description,
      price,
    })

    const { product } = await sut.execute({
      id: createProduct.id,
    })

    expect(product?.title).toEqual(title)
    expect(product?.description).toEqual(description)
    expect(product?.price).toEqual(price)
  })

  it('should return null if product not exists', async () => {
    const { product } = await sut.execute({
      id: randomUUID(),
    })

    expect(product).toEqual(null)
  })
})
