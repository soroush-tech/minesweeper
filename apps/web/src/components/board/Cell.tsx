import { useCallback, useState, FC, TouchEventHandler } from 'react'
import { useBoardMutation } from '../../common/hooks/useBoardMutation'
import { type Cell as CellT } from '../../utils/generateMinesweeperGrid'

interface CellProps {
  cell: CellT
  position: { x: number; y: number }
}

export const Cell: FC<CellProps> = ({ cell: [value, isRevealed, isFlagged], position }) => {
  const { mutate } = useBoardMutation()
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | undefined>(undefined)

  const onclick = useCallback(
    (hasRevealed = false, hasFlagged = false) => {
      if (isRevealed || (isFlagged && isFlagged === hasFlagged)) {
        return
      }
      mutate({
        position: [position.x, position.y],
        actions: [hasRevealed, hasFlagged],
      })
    },
    [isRevealed, isFlagged, position, mutate],
  )

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = () => {
    // Set a timer for the long press (right-click equivalent on mobile)
    const timerId = setTimeout(() => {
      onclick(isRevealed, !isFlagged)
    }, 800) // Long press duration
    setPressTimer(timerId)
  }

  const handleTouchEnd = () => {
    pressTimer && clearTimeout(pressTimer)
    setPressTimer(undefined)
  }

  const isMine = value === -1
  let val = ''
  if (isMine && isFlagged) {
    val = '🏳️'
  } else if (isFlagged) {
    val = '🚩'
  } else if (isMine) {
    val = isRevealed ? '💥' : '💣'
  } else if (value > 0) {
    val = value.toString()
  }

  return (
    <div
      className={`cell ${(isRevealed || isMine) && 'revealed'} cell-${value}`}
      onClick={() => onclick(true, isFlagged)}
      onContextMenu={(event) => {
        event.preventDefault()
        onclick(isRevealed, !isFlagged)
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {val}
    </div>
  )
}
