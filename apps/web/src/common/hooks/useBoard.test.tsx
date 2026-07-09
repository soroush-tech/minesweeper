import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { ReactNode } from 'react'
import { useBoard } from './useBoard'
import { server } from '../../service/mocks/server'
import { type Board } from '../../utils/generateMinesweeperGrid'

const options = { rows: 9, cells: 9, mines: 10 }

const makeBoard = (id: string, overrides: Partial<Board> = {}): Board => ({
  id,
  options,
  field: [],
  start: null,
  end: null,
  win: false,
  ...overrides,
})

// In-memory handlers so the hook test does not depend on IndexedDB.
let created = 0
const useInMemoryBoards = () =>
  server.use(
    http.get('/board/new', () => HttpResponse.json(makeBoard(`board-${++created}`))),
    http.get('/board/:id', ({ params }) => HttpResponse.json(makeBoard(params.id as string))),
  )

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
)

describe('useBoard', () => {
  beforeEach(() => {
    created = 0
    useInMemoryBoards()
  })

  it('resolves the fresh board id after mounting', async () => {
    const { result } = renderHook(() => useBoard(options), { wrapper })
    await waitFor(() => expect(result.current.result.data?.id).toBe('board-1'))
  })

  it('switches to a brand-new board when changeBoard("new") is called', async () => {
    const { result } = renderHook(() => useBoard(options), { wrapper })
    await waitFor(() => expect(result.current.result.data?.id).toBe('board-1'))

    await act(() => result.current.changeBoard('new'))

    await waitFor(() => expect(result.current.result.data?.id).toBe('board-2'))
  })
})
