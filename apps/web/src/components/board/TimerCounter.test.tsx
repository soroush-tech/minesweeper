import { act, render } from '@testing-library/react'
import { TimerCounter } from './TimerCounter'
import { segmentMap } from '../../common/consts'

// Map each rendered <polygon id> back to its index in segmentMap's segment order.
const idToIndex: Record<string, number> = {
  top: 0,
  middle: 1,
  bottom: 2,
  right_top: 3,
  right_bottom: 4,
  left_top: 5,
  left_bottom: 6,
}

// Decode one seven-segment <svg> into the digit it displays.
const readDigit = (svg: SVGElement): string => {
  const fills = new Array<string>(7)
  svg.querySelectorAll('polygon').forEach((polygon) => {
    const index = idToIndex[polygon.id]
    if (index !== undefined) {
      fills[index] = polygon.getAttribute('fill') ?? ''
    }
  })
  const match = Object.entries(segmentMap).find(
    ([key, pattern]) => key !== 'key' && pattern.every((color, i) => color === fills[i]),
  )
  return match ? match[0] : '?'
}

const readDisplay = (container: HTMLElement): string =>
  Array.from(container.querySelectorAll<SVGElement>('.seven-segment svg')).map(readDigit).join('')

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-07-08T10:00:00Z'))
})

afterEach(() => vi.useRealTimers())

describe('TimerCounter', () => {
  it('shows 000 before the game starts', () => {
    const { container } = render(<TimerCounter />)
    expect(readDisplay(container)).toBe('000')
  })

  it('shows 000 during the first second even when start is later than mount', () => {
    const { container, rerender } = render(<TimerCounter />)
    // The user waits 47s after page load before starting the game; `now`
    // still holds the mount time, so the raw difference is -47s.
    vi.setSystemTime(new Date('2026-07-08T10:00:47Z'))
    rerender(<TimerCounter start="2026-07-08T10:00:47.000Z" />)
    expect(readDisplay(container)).toBe('000')
  })

  it('counts up once the interval ticks', () => {
    const { container, rerender } = render(<TimerCounter />)
    vi.setSystemTime(new Date('2026-07-08T10:00:47Z'))
    rerender(<TimerCounter start="2026-07-08T10:00:47.000Z" />)
    act(() => vi.advanceTimersByTime(3000))
    expect(readDisplay(container)).toBe('003')
  })

  it('freezes at the elapsed time when the game ends', () => {
    const { container } = render(
      <TimerCounter start="2026-07-08T10:00:00.000Z" end="2026-07-08T10:00:12.000Z" />,
    )
    expect(readDisplay(container)).toBe('012')
  })
})
