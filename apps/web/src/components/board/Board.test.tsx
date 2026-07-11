import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { renderWithProvider } from '../../renderWithProvider'
import { MineSweeper } from './MineSweeper'
import { server } from '../../service/mocks/server'
import { useFlagStore } from '../../common/store/useFlagStore'
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
    useFlagStore.setState({ color: true, marks: true })
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

  it('shows the surprised face while the field is pressed', async () => {
    render(renderWithProvider(MineSweeper))
    // Start a fresh, in-progress board so the game-over face isn't showing.
    fireEvent.click(document.querySelector('.observerFace') as HTMLElement)
    await screen.findByAltText('smiling face')

    const field = document.querySelector('.field') as HTMLElement
    fireEvent.mouseDown(field)
    expect(screen.getByAltText('surprised face')).toBeInTheDocument()

    fireEvent.mouseUp(field)
    expect(screen.getByAltText('smiling face')).toBeInTheDocument()
  })

  it('renders the window in grayscale when Color is turned off', () => {
    render(renderWithProvider(MineSweeper))
    const win = document.querySelector('.minesweeper') as HTMLElement
    expect(win.classList.contains('grayscale')).toBe(false)

    fireEvent.click(screen.getByText('Game'))
    fireEvent.click(screen.getByText('Color'))
    expect(win.classList.contains('grayscale')).toBe(true)
  })

  it('opens the Help Topics window from the Help menu', () => {
    render(renderWithProvider(MineSweeper))
    expect(screen.queryByText(/Left-click a cell/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Help'))
    fireEvent.click(screen.getByText('Help Topics'))
    expect(screen.getByText(/Left-click a cell/)).toBeInTheDocument()
  })

  it('opens the About window from the Help menu', () => {
    render(renderWithProvider(MineSweeper))
    fireEvent.click(screen.getByText('Help'))
    fireEvent.click(screen.getByText('About Minesweeper'))
    expect(screen.getByText(/faithful remake/i)).toBeInTheDocument()
  })

  it('starts a fresh game from the Game > New menu', async () => {
    let newRequests = 0
    server.use(
      http.get('/board/new', () => {
        newRequests += 1
        return HttpResponse.json(makeBoard(`new-${newRequests}`))
      }),
    )
    render(renderWithProvider(MineSweeper))
    const before = newRequests

    fireEvent.click(screen.getByText('Game'))
    fireEvent.click(screen.getByText('New'))

    await waitFor(() => expect(newRequests).toBeGreaterThan(before))
  })

  it('starts a fresh game with the F2 key', async () => {
    let newRequests = 0
    server.use(
      http.get('/board/new', () => {
        newRequests += 1
        return HttpResponse.json(makeBoard(`f2-${newRequests}`))
      }),
    )
    render(renderWithProvider(MineSweeper))
    const before = newRequests

    fireEvent.keyDown(document, { key: 'F2' })

    await waitFor(() => expect(newRequests).toBeGreaterThan(before))
  })

  // These select a difficulty, which evicts the shared 'board/new' cache — keep
  // them last so they don't disturb the board-content tests above.
  const menuCheckFor = (label: string) =>
    screen
      .getAllByRole('menuitem')
      .find((item) => item.querySelector('.menuLabel')?.textContent === label)
      ?.querySelector('.menuCheck')?.textContent

  it('marks the chosen difficulty in the Game menu', () => {
    render(renderWithProvider(MineSweeper))
    fireEvent.click(screen.getByText('Game'))
    expect(menuCheckFor('Beginner')).toBe('✓')

    fireEvent.click(screen.getByText('Expert'))
    fireEvent.click(screen.getByText('Game'))
    expect(menuCheckFor('Expert')).toBe('✓')
    expect(menuCheckFor('Beginner')).toBe('')
  })

  it('applies custom dimensions and marks Custom in the menu', () => {
    render(renderWithProvider(MineSweeper))
    fireEvent.click(screen.getByText('Game'))
    fireEvent.click(screen.getByText('Custom...'))

    const inputs = document.querySelectorAll<HTMLInputElement>('.customFieldRow input')
    fireEvent.change(inputs[0], { target: { value: '12' } })
    fireEvent.click(screen.getByText('OK'))

    expect(screen.queryByText('Custom Field')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Game'))
    expect(menuCheckFor('Custom...')).toBe('✓')
  })
})
