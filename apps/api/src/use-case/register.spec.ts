import bcryptjs from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserExistsError } from '../repository/errors/user-exists.error'
import { UsersLimitError } from '../repository/errors/users-limit.error'
import { InMemoryUsersRepository } from '../repository/in-memory/in-memory-users.repository'
import { RegisterUseCase } from './register'

let repository: InMemoryUsersRepository
let sut: RegisterUseCase

const username = 'staff@alexandrebekor.com'
const password = '123456'

describe('Register', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(repository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      username,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the password', async () => {
    const { user } = await sut.execute({
      username,
      password,
    })

    const isHashed = await bcryptjs.compare(password, user.password)

    expect(isHashed).toBe(true)
  })

  it('should not be able to register if username already exists', async () => {
    await sut.execute({
      username,
      password,
    })

    await expect(() =>
      sut.execute({
        username,
        password,
      }),
    ).rejects.toBeInstanceOf(UserExistsError)
  })

  it('should not be able to register if exceeded the limit of 3 users', async () => {
    for (let users = 0; users < 3; users++) {
      await sut.execute({
        username: `${username}-${users}`,
        password: `${password}-${users}`,
      })
    }

    await expect(() =>
      sut.execute({
        username,
        password,
      }),
    ).rejects.toBeInstanceOf(UsersLimitError)
  })
})
