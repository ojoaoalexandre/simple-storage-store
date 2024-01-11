export class UsersLimitError extends Error {
  constructor(limit: number) {
    super(`This app allow only ${limit} active users`)
  }
}
