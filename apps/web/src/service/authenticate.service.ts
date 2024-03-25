import { User } from '@prisma/client'
import { usersGateway } from '../gateway/users.gateway'

type AuthenticateServiceResponse = {
  user: User
}

type AuthenticateServiceRequest = {
  username: string
  password: string
}

export class AuthenticateService {
  constructor(readonly userGateway: usersGateway) {}

  async execute({
    username,
    password
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.userGateway.authenticate({
      username,
      password
    })

    return {
      user
    }
  }
}
