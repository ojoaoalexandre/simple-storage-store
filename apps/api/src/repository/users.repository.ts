import { Prisma, User } from '@prisma/client'

export type UsersRepository = {
  create({ username, password }: Prisma.UserCreateInput): Promise<User>
  findByEmail(username: string): Promise<User | null>
  count(): Promise<number>
}
