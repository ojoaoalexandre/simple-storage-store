// import NextAuth from 'next-auth'
// import Credentials from 'next-auth/providers/credentials'
// import { z } from 'zod'
// import { authConfig } from './auth.config'

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { authConfig } from './auth.config'

declare module 'next-auth' {
  interface User {
    id: string
    access_token: string
  }

  interface Session {
    access_token: string
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().min(1),
          password: z.string().min(1)
        })

        const isValidSchema = schema.safeParse(credentials)
        if (isValidSchema.success) {
          // const { email, password } = isValidSchema.data
          // const repository = new PrismaUsersRepository()
          // const useCase = new AuthenticateUseCase(repository)
          // const { user } = await useCase.execute({
          //   email,
          //   password,
          // })
          // if (!user) {
          //   return null
          // }
          // return {
          //   id: user.id,
          //   access_token: '',
          // }
        }

        return null
      }
    })
  ]
})
