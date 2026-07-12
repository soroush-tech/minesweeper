import { render, fireEvent } from '@testing-library/react'
import { MineField } from './MineField'
import { type Board } from '../../utils/generateMinesweeperGrid'

// An empty field renders no cells, so no query provider is needed.
const board: Board = {
  id: 'b',
  options: { rows: 0, cells: 0, mines: 0 },
  field: [],
  start: null,
  end: null,
  win: false,
}

describe('MineField', () => {
  it('signals press start on mouse/touch down and press end on up, leave and touch end', () => {
    const onPressStart = vi.fn()
    const onPressEnd = vi.fn()
    const { container } = render(
      <MineField board={board} onPressStart={onPressStart} onPressEnd={onPressEnd} />,
    )
    const field = container.querySelector('.field') as HTMLElement

    fireEvent.mouseDown(field)
    fireEvent.touchStart(field)
    expect(onPressStart).toHaveBeenCalledTimes(2)

    fireEvent.mouseUp(field)
    fireEvent.mouseLeave(field)
    fireEvent.touchEnd(field)
    expect(onPressEnd).toHaveBeenCalledTimes(3)
  })
})
