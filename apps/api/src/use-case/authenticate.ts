import { User } from '@prisma/client'
import { UsersRepository } from '../repository/users.repository'

type AuthenticateUseCaseResponse = {
  user: User
}

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not exists')
    }

    return {
      user,
    }
  }
}
