import bcryptjs from 'bcryptjs'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CredentialsInvalidError } from '../repository/errors/credentials-invalid.error'
import { InMemoryUsersRepository } from '../repository/in-memory/in-memory-users.repository'
import { AuthenticateUseCase } from './authenticate'

let repository: InMemoryUsersRepository
let sut: AuthenticateUseCase

const username = 'staff@alexandrebekor.com'
const password = '123456'
const passwordWrong = '12345678'

describe('Authenticate', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(repository)
  })

  it('should be able to login', async () => {
    await repository.create({
      id: randomUUID(),
      username,
      password: await bcryptjs.hash(password, 6)
    })

    const { user } = await sut.execute({
      email: username,
      password
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able if user is not exists', async () => {
    expect(() =>
      sut.execute({
        email: username,
        password
      })
    ).rejects.toBeInstanceOf(CredentialsInvalidError)
  })

  it('should not be able if password is wrong', async () => {
    await repository.create({
      id: randomUUID(),
      username,
      password: await bcryptjs.hash(passwordWrong, 6)
    })

    await expect(() =>
      sut.execute({
        email: username,
        password
      })
    ).rejects.toBeInstanceOf(CredentialsInvalidError)
  })
})
