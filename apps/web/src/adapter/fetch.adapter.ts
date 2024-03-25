import { auth } from '../auth'
import { ApiError } from '../gateway/error/api.error'
import { HttpAdapter } from './http.adapter'

export class FetchAdapter implements HttpAdapter {
  async get(url: string, init?: RequestInit) {
    const defaultHeader = await this.getHeader()

    const headers = {
      ...init?.headers,
      ...defaultHeader
    }

    const response = await fetch(url, {
      method: 'GET',
      ...init,
      headers
    })

    if (response.ok) {
      const data = await response.json()
      return data
    }

    try {
      const data = await response.json()

      throw new ApiError(JSON.stringify(data))
    } catch (error) {
      throw new ApiError()
    }
  }

  async post(url: string, body?: object, init?: RequestInit) {
    const defaultHeader = await this.getHeader()

    const headers = {
      ...init?.headers,
      ...defaultHeader
    }

    const response = await fetch(url, {
      method: 'POST',
      ...init,
      headers,
      body: JSON.stringify(body)
    })

    if (response.ok) {
      const data = await response.json()
      return data
    }

    try {
      const data = await response.json()

      throw new ApiError(JSON.stringify(data))
    } catch (error) {
      throw new ApiError()
    }
  }

  async put(url: string, body?: object, init?: RequestInit) {
    const defaultHeader = await this.getHeader()

    const headers = {
      ...init?.headers,
      ...defaultHeader
    }

    const response = await fetch(url, {
      method: 'PUT',
      ...init,
      headers,
      body: JSON.stringify(body)
    })

    if (response.ok) {
      const data = await response.json()
      return data
    }

    try {
      const data = await response.json()

      throw new ApiError(JSON.stringify(data))
    } catch (error) {
      throw new ApiError()
    }
  }

  async delete(url: string, body?: object, init?: RequestInit) {
    const defaultHeader = await this.getHeader()

    const headers = {
      ...init?.headers,
      ...defaultHeader
    }

    const response = await fetch(url, {
      method: 'DELETE',
      ...init,
      headers,
      body: JSON.stringify(body)
    })

    if (response.ok) {
      const data = await response.json()
      return data
    }

    try {
      const data = await response.json()

      throw new ApiError(JSON.stringify(data))
    } catch (error) {
      throw new ApiError()
    }
  }

  async getHeader(): Promise<{ [value: string]: string }> {
    const session = await auth()

    if (session && session.access_token) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      }
    }

    return {
      'Content-Type': 'application/json'
    }
  }
}
