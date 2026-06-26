import { FC } from 'react'
import { Display } from '../../common/components/Display'
import { calculateTimeDifferenceInSeconds } from '../../utils/calculateTimeDifferenceInSeconds.js'
import { useEffect, useState } from 'react'

interface TimerCounter {
  start?: string | null
  end?: string | null
}

export const TimerCounter: FC<TimerCounter> = ({ start, end }) => {
  const [timeDifference, setTimeDifference] = useState<number>(0)
  useEffect(() => {
    if (start == null) {
      setTimeDifference(0)
      return
    }
    const intervalId = setInterval(() => {
      const differenceInSeconds = calculateTimeDifferenceInSeconds(start, end)
      setTimeDifference(Math.round(differenceInSeconds))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [start, end])

  return (
    <div className="minesCounter">
      <Display display={timeDifference} initValue="0" />
    </div>
  )
}
