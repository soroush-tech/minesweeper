import './board.css'
import { MineField } from './MineField.tsx'
import { MinesCounter } from './MinesCounter.tsx'
import { TimerCounter } from './TimerCounter'
import { useBoard } from '../../common/hooks/useBoard'
import { ObserverFace } from './ObserverFace'
import { type Board as BoardT, generateMinesweeperGrid } from '../../utils/generateMinesweeperGrid'

export const Board = () => {
  const options = {
    cells: 9,
    rows: 9,
    mines: 10,
  }
  const { result, changeBoard } = useBoard(options)
  const { data, isFetched } = result
  const board: BoardT = isFetched
    ? data
    : {
        options,
        id: 'new',
        field: generateMinesweeperGrid(options),
        start: null,
        end: null,
      }
  return (
    <div className="board">
      <div className="header">
        <MinesCounter />
        <ObserverFace board={data} changeBoard={changeBoard} />
        <TimerCounter start={data?.start} end={data?.end} />
      </div>
      <MineField key={data?.id || 'new'} board={board} />
    </div>
  )
}
