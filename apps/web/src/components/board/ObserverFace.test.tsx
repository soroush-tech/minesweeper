import { render, screen, fireEvent } from '@testing-library/react'
import { ObserverFace } from './ObserverFace'
import { emoji } from '../../common/consts'
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
    expect(screen.getByText(emoji.status[0])).toBeInTheDocument()
  })

  it('shows the win face when the game ends in a win', () => {
    render(<ObserverFace board={makeBoard({ end: 'now', win: true })} changeBoard={vi.fn()} />)
    expect(screen.getByText(emoji.status[2])).toBeInTheDocument()
  })

  it('shows the lose face when the game ends in a loss', () => {
    render(<ObserverFace board={makeBoard({ end: 'now', win: false })} changeBoard={vi.fn()} />)
    expect(screen.getByText(emoji.status[3])).toBeInTheDocument()
  })

  it('starts a new board on click', () => {
    const changeBoard = vi.fn().mockResolvedValue(undefined)
    render(<ObserverFace board={makeBoard()} changeBoard={changeBoard} />)
    fireEvent.click(screen.getByText(emoji.status[0]))
    expect(changeBoard).toHaveBeenCalledWith('new')
  })
})
