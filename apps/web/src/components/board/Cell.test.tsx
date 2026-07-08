import { render, screen, fireEvent } from '@testing-library/react'
import { renderWithProvider } from '../../renderWithProvider'
import { Cell } from './Cell'
import { useFlagStore } from '../../common/store/useFlagStore'
import { type Cell as CellT } from '../../utils/generateMinesweeperGrid'

const renderCell = (cell: CellT, isGameOver = false) =>
  render(
    renderWithProvider(() => (
      <Cell cell={cell} position={{ x: 0, y: 0 }} boardId="b1" isGameOver={isGameOver} />
    )),
  )

describe('Cell', () => {
  beforeEach(() => {
    useFlagStore.setState({ mines: 0, boards: {} })
  })

  it('shows the flag icon on a flagged cell', () => {
    useFlagStore.setState({ boards: { b1: { '0:0': 'flag' } } })
    renderCell([0, false, false])
    expect(screen.getByAltText('flag')).toBeInTheDocument()
  })

  it('shows the question-mark icon on a question-marked cell', () => {
    useFlagStore.setState({ boards: { b1: { '0:0': 'question' } } })
    renderCell([0, false, false])
    expect(screen.getByAltText('question mark')).toBeInTheDocument()
  })

  it('shows the mine icon on a mine cell', () => {
    renderCell([-1, false, false])
    expect(screen.getByAltText('mine')).toBeInTheDocument()
  })

  it('marks only the clicked mine as exploded', () => {
    renderCell([-1, true, false])
    expect(screen.getByAltText('mine').closest('.cell')).toHaveClass('exploded')
  })

  it('reveals the remaining mines without the exploded mark at game over', () => {
    renderCell([-1, false, false])
    const cell = screen.getByAltText('mine').closest('.cell')
    expect(cell).toHaveClass('revealed')
    expect(cell).not.toHaveClass('exploded')
  })

  it('keeps the flag on a flagged mine at game over', () => {
    useFlagStore.setState({ boards: { b1: { '0:0': 'flag' } } })
    renderCell([-1, false, false])
    expect(screen.getByAltText('flag')).toBeInTheDocument()
    expect(screen.queryByAltText('mine')).not.toBeInTheDocument()
  })

  it('shows the adjacent mine count on a revealed cell', () => {
    renderCell([3, true, false])
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('cycles the mark on right click while the game is running', () => {
    useFlagStore.setState({ mines: 10 })
    const { container } = renderCell([0, false, false])
    fireEvent.contextMenu(container.querySelector('.cell')!)
    expect(screen.getByAltText('flag')).toBeInTheDocument()
  })

  it('does not change the mark after game over', () => {
    useFlagStore.setState({ mines: 10 })
    const { container } = renderCell([0, false, false], true)
    fireEvent.contextMenu(container.querySelector('.cell')!)
    expect(screen.queryByAltText('flag')).not.toBeInTheDocument()
  })
})
