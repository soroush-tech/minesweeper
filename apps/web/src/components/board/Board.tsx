import { MineField } from './MineField'
import { MinesCounter } from './MinesCounter'
import { TimerCounter } from './TimerCounter'
import { useBoard } from '../../common/hooks/useBoard'
import { ObserverFace } from './ObserverFace'
import { type Board as BoardT, generateMinesweeperGrid } from '../../utils/generateMinesweeperGrid'

interface Options {
  rows: number
  cells: number
  mines: number
}

interface BoardProps {
  options: Options
}

export const Board = ({ options }: BoardProps) => {
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
        win: false,
      }
  return (
    <div className="board">
      <div className="header">
        <MinesCounter board={board} />
        <ObserverFace board={data} changeBoard={changeBoard} />
        <TimerCounter start={data?.start} end={data?.end} />
      </div>
      <MineField key={data?.id || 'new'} board={board} />
    </div>
  )
}
