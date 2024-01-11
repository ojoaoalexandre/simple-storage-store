import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repository/in-memory/in-memory-products.repository'
import { GetProducts } from './get-products'

let repository: InMemoryProductsRepository
let sut: GetProducts

const title = 'A title of example'
const description = 'A description of example'
const price = 50

describe('Get Products', () => {
  beforeEach(() => {
    repository = new InMemoryProductsRepository()
    sut = new GetProducts(repository)
  })

  it('should be able to get products if empty', async () => {
    const { products } = await sut.execute()

    expect(products).toHaveLength(0)
  })

  it('should be able to get a list of products', async () => {
    await repository.create({
      title,
      description,
      price,
    })

    const { products } = await sut.execute()

    expect(products).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
    ])
  })
})
