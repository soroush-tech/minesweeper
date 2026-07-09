import { useQuery } from '@tanstack/react-query'
import defaultClient, { Client, type RequestConfig } from '../../utils/api/client'

interface UseCustomQueryParams {
  queryKey: Array<string | number>
  config: RequestConfig
  options?: any
  client?: Client
}

export const useCustomQuery = <TData, TransformData>({
  queryKey,
  config,
  options = {},
  client,
}: UseCustomQueryParams) => {
  const defaultOptions = {
    staleTime: Infinity,
  }
  return useQuery<TData>({
    // ...(options || {}),
    ...options,
    ...defaultOptions,
    queryKey,
    queryFn: async () =>
      (client || defaultClient).call<TData, TransformData>({ ...(config || {}) }),
  })
}
