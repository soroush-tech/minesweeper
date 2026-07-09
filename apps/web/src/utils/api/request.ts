import qs from 'query-string'
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type RawAxiosRequestHeaders,
} from 'axios'
import { removeEmptyValues } from '../removeEmptyValues'
import { REQUEST_TIMEOUT } from '../../config.ts'

const errorHandler = (error: Error) => {
  if (error.message.includes('Network Error')) {
    return Promise.reject({
      code: 520,
      message: 'Network Error',
      details: error,
    })
  }
  if (error.message.includes('timeout') || error.message.includes('Cancel')) {
    return Promise.reject({
      code: 504,
      message: 'Time out',
      details: error,
    })
  }

  return Promise.reject(error)
}

export const createRequest = (defaultOptions: AxiosRequestConfig = {}): AxiosInstance => {
  const headers: RawAxiosRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: '',
  }
  // example to add token to header
  // if (token && token.accessToken) {
  //   headers.authorization = `${accessToken}`
  // }

  const options: AxiosRequestConfig = {
    timeout: REQUEST_TIMEOUT,
    data: {},
    headers,
    ...defaultOptions,
    paramsSerializer: (params: object) => qs.stringify(removeEmptyValues(params)),
    maxContentLength: 20000,
  }

  const request: AxiosInstance = axios.create(options)

  //axios interceptors for custom logic
  request.interceptors.request.use((req) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('API request', req)
    }
    return req
  })

  request.interceptors.response.use((res) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('API response', res)
    }
    return res
  }, errorHandler)

  return request
}
