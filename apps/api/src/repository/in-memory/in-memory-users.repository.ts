import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async findByEmail(username: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username)

    if (user) {
      return user
    }

    return null
  }

  async create({ username, password }: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      username,
      password,
    }

    this.users.push(user)

    return user
  }

  async count(): Promise<number> {
    return this.users.length
  }
}
