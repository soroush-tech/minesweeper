import { useCallback, useState, FC, TouchEventHandler } from 'react'
import { useBoardMutation } from '../../common/hooks/useBoardMutation'
import { type Cell as CellT } from '../../utils/generateMinesweeperGrid'
import { useFlagStore } from '../../common/store/useFlagStore'

interface CellProps {
  cell: CellT
  position: { x: number; y: number }
  boardId: string
}

export const Cell: FC<CellProps> = ({ cell: [value, isRevealed], position, boardId }) => {
  const { mutate } = useBoardMutation()
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
    if (isRevealed) {
      return
    }
    cycleFlag(boardId, key)
  }, [isRevealed, cycleFlag, boardId, key])

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
  let val = ''
  if (!isRevealed && flagState === 'flag') {
    val = '🚩'
  } else if (!isRevealed && flagState === 'question') {
    val = '❓'
  } else if (isMine) {
    val = isRevealed ? '💥' : '💣'
  } else if (value > 0) {
    val = value.toString()
  }

  return (
    <div
      className={`cell ${(isRevealed || isMine) && 'revealed'} cell-${value}`}
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
