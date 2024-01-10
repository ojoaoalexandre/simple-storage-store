export type HttpAdapter = {
  get(url: string, init?: RequestInit): Promise<object>
  post(url: string, body?: object, init?: RequestInit): Promise<object>
  put(url: string, body: object, init?: RequestInit): Promise<object>
  delete(url: string, body: object, init?: RequestInit): Promise<object>
  getHeader(): Promise<{ [value: string]: string }>
}
