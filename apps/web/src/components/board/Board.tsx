import { useState } from 'react'
import { useIsMutating } from '@tanstack/react-query'
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
  // Surprised face: from the moment a cell is pressed (`pressing`) through the
  // in-flight reveal mutation, until the API responds with the new board state.
  const [pressing, setPressing] = useState(false)
  const isRevealing = useIsMutating() > 0
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
        <ObserverFace board={data} changeBoard={changeBoard} pending={pressing || isRevealing} />
        <TimerCounter start={data?.start} end={data?.end} />
      </div>
      <MineField
        key={data?.id || 'new'}
        board={board}
        onPressStart={() => setPressing(true)}
        onPressEnd={() => setPressing(false)}
      />
    </div>
  )
}
