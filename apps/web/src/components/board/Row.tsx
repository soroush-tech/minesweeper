import { FC } from 'react'
import { Cell } from './Cell'
import { type Cell as CellT } from '../../utils/generateMinesweeperGrid'

interface RowProps {
  cells: CellT[]
  y: number
  boardId: string
}

export const Row: FC<RowProps> = ({ cells, y, boardId }) => {
  return (
    <div className="row">
      {cells.map((cell, x) => (
        <Cell key={`${y}:${x}`} cell={cell} position={{ x, y }} boardId={boardId} />
      ))}
    </div>
  )
}
