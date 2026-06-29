import { isWin } from './isWin.ts'
import { type Field } from './generateMinesweeperGrid.ts'

describe('isWin', () => {
  it('wins when every non-mine cell is revealed', () => {
    const field: Field = [
      [
        [1, true, false],
        [-1, false, false],
      ],
      [
        [1, true, false],
        [1, true, false],
      ],
    ]
    expect(isWin(field)).toBe(true)
  })

  it('does not win while a non-mine cell is still hidden', () => {
    const field: Field = [
      [
        [1, true, false],
        [-1, false, false],
      ],
      [
        [1, false, false],
        [1, true, false],
      ],
    ]
    expect(isWin(field)).toBe(false)
  })

  it('does not require mines to be revealed', () => {
    const field: Field = [
      [
        [-1, false, false],
        [-1, false, false],
      ],
      [
        [2, true, false],
        [2, true, false],
      ],
    ]
    expect(isWin(field)).toBe(true)
  })
})
