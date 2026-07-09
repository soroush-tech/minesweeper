import { vi } from 'vitest'
import { worker } from './runtime'

// Mock the `setupWorker` function from 'msw/browser'
vi.mock('msw/browser', () => ({
  setupWorker: vi.fn(() => 'mockServiceWorker'),
}))

describe('MSW worker', () => {
  it('is defined and works correctly', () => {
    expect(worker).toBeDefined()
    expect(worker).toEqual('mockServiceWorker')
  })
})
