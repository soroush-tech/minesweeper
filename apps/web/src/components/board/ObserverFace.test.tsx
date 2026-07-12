import { render, screen, fireEvent } from '@testing-library/react'
import { ObserverFace } from './ObserverFace'
import { type Board } from '../../utils/generateMinesweeperGrid'

const makeBoard = (overrides: Partial<Board> = {}): Board => ({
  id: 'test',
  options: { rows: 9, cells: 9, mines: 10 },
  field: [],
  start: null,
  end: null,
  win: false,
  ...overrides,
})

describe('ObserverFace', () => {
  it('shows the default face while the game is in progress', () => {
    render(<ObserverFace board={makeBoard()} changeBoard={vi.fn()} />)
    expect(screen.getByAltText('smiling face')).toBeInTheDocument()
  })

  it('shows the default face while the board is still loading', () => {
    render(<ObserverFace board={makeBoard({ id: '' })} changeBoard={vi.fn()} />)
    expect(screen.getByAltText('smiling face')).toBeInTheDocument()
  })

  it('shows the win face when the game ends in a win', () => {
    render(<ObserverFace board={makeBoard({ end: 'now', win: true })} changeBoard={vi.fn()} />)
    expect(screen.getByAltText('sunglasses face')).toBeInTheDocument()
  })

  it('shows the lose face when the game ends in a loss', () => {
    render(<ObserverFace board={makeBoard({ end: 'now', win: false })} changeBoard={vi.fn()} />)
    expect(screen.getByAltText('x-eyes face')).toBeInTheDocument()
  })

  it('shows the surprised face while a move is pending', () => {
    render(<ObserverFace board={makeBoard()} changeBoard={vi.fn()} pending />)
    expect(screen.getByAltText('surprised face')).toBeInTheDocument()
  })

  it('shows the game-over face rather than surprised once the game has ended', () => {
    render(
      <ObserverFace board={makeBoard({ end: 'now', win: false })} changeBoard={vi.fn()} pending />,
    )
    expect(screen.getByAltText('x-eyes face')).toBeInTheDocument()
  })

  it('starts a new board on click', () => {
    const changeBoard = vi.fn().mockResolvedValue(undefined)
    render(<ObserverFace board={makeBoard()} changeBoard={changeBoard} />)
    fireEvent.click(screen.getByAltText('smiling face'))
    expect(changeBoard).toHaveBeenCalledWith('new')
  })
})
