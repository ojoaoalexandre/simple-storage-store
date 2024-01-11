import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../../repository/prisma/prisma-users.repository'
import { RegisterUseCase } from '../../use-case/register'

export const registerController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  try {
    const repository = new PrismaUsersRepository()
    const register = new RegisterUseCase(repository)
  } catch (error) {}
}
