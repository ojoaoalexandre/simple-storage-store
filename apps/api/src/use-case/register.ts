import { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { UserExistsError } from '../repository/errors/user-exists.error'
import { UsersLimitError } from '../repository/errors/users-limit.error'
import { UsersRepository } from '../repository/users.repository'

export type RegisterUseCaseRequest = {
  username: string
  password: string
}

export type RegisterUseCaseResponse = {
  user: User
}

export class RegisterUseCase {
  constructor(readonly userRepository: UsersRepository) {}

  async execute({
    username,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const existsUser = await this.userRepository.findByEmail(username)

    if (existsUser) {
      throw new UserExistsError()
    }

    const usersActive = await this.userRepository.count()

    const limitUsers = 3
    if (usersActive >= limitUsers) {
      throw new UsersLimitError(limitUsers)
    }

    const passwordHash = await bcryptjs.hash(password, 6)

    const user = await this.userRepository.create({
      username,
      password: passwordHash,
    })

    return { user }
  }
}
