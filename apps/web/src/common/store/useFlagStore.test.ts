import { flagCount, useFlagStore } from './useFlagStore.ts'

const { getState, setState } = useFlagStore
const BOARD = 'board-1'

beforeEach(() => setState({ mines: 10, boards: {}, marks: true }))

describe('useFlagStore', () => {
  it('cycles a cell none -> flag -> question -> none', () => {
    getState().cycleFlag(BOARD, '0:0')
    expect(getState().boards[BOARD]['0:0']).toBe('flag')

    getState().cycleFlag(BOARD, '0:0')
    expect(getState().boards[BOARD]['0:0']).toBe('question')

    getState().cycleFlag(BOARD, '0:0')
    expect(getState().boards[BOARD]['0:0']).toBeUndefined()
  })

  it('counts flags but not question marks', () => {
    getState().cycleFlag(BOARD, '0:0') // flag
    getState().cycleFlag(BOARD, '1:0') // flag
    getState().cycleFlag(BOARD, '1:0') // question
    expect(flagCount(getState().boards[BOARD])).toBe(1)
  })

  it('does not flag beyond the mine count, marking extra cells as questions', () => {
    setState({ mines: 1, boards: {} })

    getState().cycleFlag(BOARD, '0:0') // flag — reaches the cap
    getState().cycleFlag(BOARD, '1:0') // cap reached, becomes a question instead

    expect(getState().boards[BOARD]['0:0']).toBe('flag')
    expect(getState().boards[BOARD]['1:0']).toBe('question')
    expect(flagCount(getState().boards[BOARD])).toBe(1)
  })

  it('cycles a cell flag -> none when marks are off, skipping the question', () => {
    setState({ marks: false })
    getState().cycleFlag(BOARD, '0:0')
    expect(getState().boards[BOARD]['0:0']).toBe('flag')

    getState().cycleFlag(BOARD, '0:0')
    expect(getState().boards[BOARD]['0:0']).toBeUndefined()
  })

  it('leaves a capped cell unmarked when marks are off', () => {
    setState({ mines: 1, boards: {}, marks: false })
    getState().cycleFlag(BOARD, '0:0') // flag — reaches the cap
    getState().cycleFlag(BOARD, '1:0') // cap reached, marks off -> stays none

    expect(getState().boards[BOARD]['1:0']).toBeUndefined()
  })

  it('toggleMarks flips the marks setting', () => {
    expect(getState().marks).toBe(true)
    getState().toggleMarks()
    expect(getState().marks).toBe(false)
    getState().toggleMarks()
    expect(getState().marks).toBe(true)
  })

  it('keeps marks isolated per board', () => {
    getState().cycleFlag('a', '0:0') // flag on board a
    getState().cycleFlag('b', '0:0') // flag on board b
    getState().cycleFlag('b', '0:0') // ...turned into a question

    expect(flagCount(getState().boards['a'])).toBe(1)
    expect(flagCount(getState().boards['b'])).toBe(0)
  })
})
