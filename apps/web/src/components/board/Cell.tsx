import { useCallback, useState, FC, ReactNode, TouchEventHandler } from 'react'
import { useBoardMutation } from '../../common/hooks/useBoardMutation'
import { type Cell as CellT } from '../../utils/generateMinesweeperGrid'
import { useFlagStore } from '../../common/store/useFlagStore'
import flagIcon from '../../assets/flag.svg'
import mineIcon from '../../assets/mine.svg'
import questionMarkIcon from '../../assets/question-mark.svg'

interface CellProps {
  cell: CellT
  position: { x: number; y: number }
  boardId: string
  isGameOver: boolean
}

export const Cell: FC<CellProps> = ({
  cell: [value, isRevealed],
  position,
  boardId,
  isGameOver,
}) => {
  const { mutate } = useBoardMutation(boardId)
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | undefined>(undefined)

  const key = `${position.x}:${position.y}`
  const flagState = useFlagStore((state) => state.boards[boardId]?.[key])
  const cycleFlag = useFlagStore((state) => state.cycleFlag)

  const reveal = useCallback(() => {
    if (isRevealed || flagState === 'flag') {
      return
    }
    mutate({
      position: [position.x, position.y],
      actions: [true, false],
    })
  }, [isRevealed, flagState, position, mutate])

  const toggleFlag = useCallback(() => {
    if (isRevealed || isGameOver) {
      return
    }
    cycleFlag(boardId, key)
  }, [isRevealed, isGameOver, cycleFlag, boardId, key])

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = () => {
    // Long press is the right-click equivalent on mobile.
    const timerId = setTimeout(toggleFlag, 800)
    setPressTimer(timerId)
  }

  const handleTouchEnd = () => {
    if (pressTimer) clearTimeout(pressTimer)
    setPressTimer(undefined)
  }

  const isMine = value === -1
  let val: ReactNode = ''
  // A mine value is only visible to the client once it exploded or the game is
  // over, so it wins over a flag; wrong flags (non-mine cells) stay flagged.
  if (isMine) {
    val = <img src={mineIcon} alt="mine" />
  } else if (!isRevealed && flagState === 'flag') {
    val = <img src={flagIcon} alt="flag" />
  } else if (!isRevealed && flagState === 'question') {
    val = <img src={questionMarkIcon} alt="question mark" />
  } else if (value > 0) {
    val = value.toString()
  }

  return (
    <div
      className={`cell ${(isRevealed || isMine) && 'revealed'} ${
        isRevealed && isMine && 'exploded'
      } cell-${value}`}
      onClick={reveal}
      onContextMenu={(event) => {
        event.preventDefault()
        toggleFlag()
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {val}
    </div>
  )
}
