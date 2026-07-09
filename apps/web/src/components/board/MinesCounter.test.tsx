import { render } from '@testing-library/react'
import { MinesCounter } from './MinesCounter'
import { segmentMap } from '../../common/consts'
import { useFlagStore, type FlagState } from '../../common/store/useFlagStore'
import { type Board } from '../../utils/generateMinesweeperGrid'

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

const board: Board = {
  id: 'test',
  options: { rows: 9, cells: 9, mines: 10 },
  field: [],
  start: null,
  end: null,
  win: false,
}

const setFlags = (flags: Record<string, FlagState>) =>
  useFlagStore.setState({ mines: 10, boards: { [board.id]: flags } })

beforeEach(() => useFlagStore.setState({ mines: 10, boards: {} }))

describe('MinesCounter', () => {
  it('shows the total mine count when nothing is flagged', () => {
    const { container } = render(<MinesCounter board={board} />)
    expect(readDisplay(container)).toBe('010')
  })

  it('counts down for flags but ignores question marks', () => {
    setFlags({ '0:0': 'flag', '1:0': 'flag', '2:0': 'flag', '3:0': 'question' })
    const { container } = render(<MinesCounter board={board} />)
    expect(readDisplay(container)).toBe('007')
  })
})
