import { Row } from './Row'
import { type Board } from '../../utils/generateMinesweeperGrid'
import { FC } from 'react'

interface MineFieldProps {
  board: Board
  // Pressing a cell shows the surprised face; releasing (a click) reveals it.
  onPressStart?: () => void
  onPressEnd?: () => void
}

export const MineField: FC<MineFieldProps> = ({ board, onPressStart, onPressEnd }) => {
  const { field, id, end } = board
  return (
    <div
      className="field"
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onMouseLeave={onPressEnd}
      onTouchStart={onPressStart}
      onTouchEnd={onPressEnd}
    >
      {field?.map((row, y) => (
        <Row key={`${id}:${y}`} cells={row} y={y} boardId={id} isGameOver={end != null} />
      ))}
    </div>
  )
}
