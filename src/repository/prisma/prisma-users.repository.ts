import { database } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class PrismaUsersRepository implements UsersRepository {
  async create({ username, password }: Prisma.UserCreateInput): Promise<User> {
    const user = await database.user.create({
      data: {
        username,
        password,
      },
    })

    return user
  }

  async findByEmail(username: string): Promise<User | null> {
    const user = await database.user.findUnique({
      where: {
        username,
      },
    })

    if (user) {
      return user
    }

    return null
  }

  async count(): Promise<number> {
    const users = await database.user.count()

    return users
  }
}
