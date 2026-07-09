import { StrictMode, type FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const renderWithProvider = (Component: FC) => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  </StrictMode>
)
