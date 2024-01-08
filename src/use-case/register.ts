import { UsersRepository } from '@/repository/users.repository'
import { User } from '@prisma/client'

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
    const user = await this.userRepository.create({
      username,
      password,
    })

    return { user }
  }
}
