import { FC, useEffect } from 'react'
import { Display } from '../../common/components/Display'
import { type Board } from '../../utils/generateMinesweeperGrid'
import { flagCount, useFlagStore } from '../../common/store/useFlagStore'

interface MinesCounterProps {
  board: Board
}

export const MinesCounter: FC<MinesCounterProps> = ({ board }) => {
  const mines = board.options.mines
  const setMines = useFlagStore((state) => state.setMines)
  const flagged = useFlagStore((state) => flagCount(state.boards[board.id]))

  useEffect(() => {
    setMines(mines)
  }, [mines, setMines])

  return (
    <div className="minesCounter">
      <Display display={mines - flagged} initValue="0" />
    </div>
  )
}
