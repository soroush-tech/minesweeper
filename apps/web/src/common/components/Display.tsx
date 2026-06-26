import './display.css'
import { SevenSegment } from './SevenSegment'
import { leftPadCount } from '../../utils/leftPad.ts'

interface Display {
  display: string | number
  max?: number
  initValue: string
}
export const Display = ({ display, max = 3, initValue }: Display) => {
  const value = typeof display === 'string' ? display : display?.toString() || ''
  const pads = leftPadCount(value, max)
  return (
    <div className="display">
      {Array.from(
        { length: max },
        (_, index) =>
          index < max && (
            <SevenSegment
              key={`${value}:${index}`}
              characters={index < pads ? initValue : value[index - pads]}
            />
          ),
      )}
    </div>
  )
}
