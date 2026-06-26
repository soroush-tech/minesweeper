import { Row } from './Row'
import { type Board } from '../../utils/generateMinesweeperGrid'
import { FC } from 'react'

interface MineFieldProps {
  board: Board
}

export const MineField: FC<MineFieldProps> = ({ board }) => {
  const { field, id } = board
  return (
    <div className="field">
      {field?.map((row, y) => (
        <Row key={`${id}:${y}`} cells={row} y={y} />
      ))}
    </div>
  )
}
