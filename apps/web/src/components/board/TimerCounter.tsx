import { FC } from 'react'
import { Display } from '../../common/components/Display'
import { calculateTimeDifferenceInSeconds } from '../../utils/calculateTimeDifferenceInSeconds.js'
import { useEffect, useState } from 'react'

interface TimerCounter {
  start?: string | null
  end?: string | null
}

export const TimerCounter: FC<TimerCounter> = ({ start, end }) => {
  // `now` advances once per second while the game is running so the derived
  // elapsed time keeps ticking, without setting state in the effect body.
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (start == null || end != null) {
      return
    }
    const intervalId = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(intervalId)
  }, [start, end])

  const reference = end ?? new Date(now).toISOString()
  // `now` can lag behind `start` until the first interval tick, so clamp to
  // avoid rendering a negative elapsed time.
  const timeDifference =
    start == null ? 0 : Math.max(0, Math.round(calculateTimeDifferenceInSeconds(start, reference)))

  return (
    <div className="minesCounter">
      <Display display={timeDifference} initValue="0" />
    </div>
  )
}
