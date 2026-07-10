import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { renderWithProvider } from '../../renderWithProvider'
import { MineSweeper } from './MineSweeper'
import { server } from '../../service/mocks/server'
import { type Board as BoardT } from '../../utils/generateMinesweeperGrid'

const makeBoard = (id: string, overrides: Partial<BoardT> = {}): BoardT => ({
  id,
  options: { rows: 9, cells: 9, mines: 10 },
  field: [],
  start: null,
  end: null,
  win: false,
  ...overrides,
})

describe('Board', () => {
  // In-memory handlers: board-1 is already lost, every later board is fresh.
  // The counter never resets — the query cache is shared across tests.
  let created = 0
  beforeEach(() => {
    server.use(
      http.get('/board/new', () => HttpResponse.json(makeBoard(`board-${++created}`))),
      http.get('/board/:id', ({ params }) => {
        const id = params.id as string
        return HttpResponse.json(makeBoard(id, id === 'board-1' ? { end: 'now' } : {}))
      }),
    )
  })

  it('shows the window title bar and menu bar', () => {
    render(renderWithProvider(MineSweeper))
    expect(screen.getByText('Minesweeper')).toBeInTheDocument()
    expect(screen.getByText('Game')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  it('opens the Custom Field dialog from the Game menu', () => {
    render(renderWithProvider(MineSweeper))
    expect(screen.queryByText('Custom Field')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Game'))
    fireEvent.click(screen.getByText('Custom...'))

    expect(screen.getByText('Custom Field')).toBeInTheDocument()
  })

  it('starts a new game when the face is clicked after game over', async () => {
    render(renderWithProvider(MineSweeper))
    const loseFace = await screen.findByAltText('x-eyes face')

    fireEvent.click(loseFace)

    await waitFor(() => expect(screen.getByAltText('smiling face')).toBeInTheDocument())
  })
})
