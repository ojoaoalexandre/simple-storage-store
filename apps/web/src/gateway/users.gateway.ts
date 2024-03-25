import { User } from '@prisma/client'

export type usersGateway = {
  authenticate({
    username,
    password
  }: {
    username: string
    password: string
  }): Promise<User>
}
