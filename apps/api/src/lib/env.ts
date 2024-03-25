import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  HOST: z.string().min(1),
  PORT: z.coerce.number().default(3333),
  JWT: z.string().min(1)
})

const _env = schema.safeParse(process.env)

if (!_env.success) {
  const errorMessage =
    'Error in variable environment' + JSON.stringify(_env.error)

  console.log(errorMessage)
  throw new Error(errorMessage)
}

export const env = _env.data
