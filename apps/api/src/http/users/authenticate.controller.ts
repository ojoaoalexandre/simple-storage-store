import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../repository/prisma/prisma-users.repository'
import { AuthenticateUseCase } from '../../use-case/authenticate'

export const authenticateController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = schema.parse(request.body)

  try {
    const repository = new PrismaUsersRepository()
    const authenticate = new AuthenticateUseCase(repository)

    const { user } = await authenticate.execute({
      email,
      password,
    })

    const token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return response.status(200).send({
      accessToken: token,
      email: user.username,
    })
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
