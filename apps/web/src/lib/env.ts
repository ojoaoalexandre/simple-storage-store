import { z } from 'zod'

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
})

export const _env = schema.safeParse(process.env)

if (!_env.success) {
  const errorMessage = 'Error in .env'

  console.error(errorMessage)
  throw new Error(errorMessage)
}

export const env = _env.data
