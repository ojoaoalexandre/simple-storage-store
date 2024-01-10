import { Prisma, Product } from '@prisma/client'

export type ProductsRepository = {
  find(): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  create({
    title,
    description,
    price,
  }: Prisma.ProductCreateInput): Promise<boolean>
  delete(id: string): Promise<boolean>
}
