import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { createRequest } from './request'
import { BASE_URL } from '../../config.ts'

interface Option {
  baseURL?: string
}

export interface RequestConfig extends AxiosRequestConfig {
  [key: string]: any
}

interface Args<TData, TransformData> extends RequestConfig {
  transformResult?: (data: AxiosResponse<TData, any>) => TransformData
  [key: string]: any
}

export class Client {
  fetch: AxiosInstance | null = null

  constructor(option?: Option) {
    if (option) {
      this.create(option)
    }
  }

  rest = (config: RequestConfig): Promise<any> => {
    if (!this.fetch) {
      return Promise.reject(new Error('Fetch is not initialized'))
    }
    return this.fetch.request({
      ...config,
    })
  }

  call = async <TData, TransformData>({
    transformResult = (res): TransformData => res.data as unknown as TransformData,
    ...args
  }: Args<TData, TransformData>): Promise<TransformData> => {
    if (!this.fetch) {
      throw new Error('Fetch is not initialized')
    }
    const response = await this.fetch<TData>(args)
    return transformResult(response)
  }

  create(option: Option = {}): void {
    this.fetch = createRequest(option)
  }
}

export default new Client({
  baseURL: BASE_URL,
})
