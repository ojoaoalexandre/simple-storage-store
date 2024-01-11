import { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { CredentialsInvalidError } from '../repository/errors/credentials-invalid.error'
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
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new CredentialsInvalidError()
    }

    const isSamePassword = await bcryptjs.compare(password, user.password)

    if (!isSamePassword) {
      throw new CredentialsInvalidError()
    }

    return {
      user,
    }
  }
}
