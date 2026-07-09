import './minesweeper.css'
import { WindowBar } from './WindowBar'
import { Board } from './Board'

const defaultOptions = {
  cells: 9,
  rows: 9,
  mines: 10,
}

export const MineSweeper = () => {
  return (
    <div className="minesweeper">
      <WindowBar />
      <Board options={defaultOptions} />
    </div>
  )
}
