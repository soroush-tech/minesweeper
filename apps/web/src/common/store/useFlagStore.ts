import { create } from 'zustand'

// Per-cell mark state. A 🚩 flag counts toward the mine counter; a ❓ question
// mark does not. Cells with no mark are simply absent from the record.
export type FlagState = 'flag' | 'question'
export type BoardFlags = Record<string, FlagState>

interface FlagStore {
  mines: number
  // When on, the mark cycle includes the ❓ question mark; when off it is just
  // flag ⇄ none. Toggled by the "Marks (?)" menu entry.
  marks: boolean
  // Marks are namespaced by board id, so each game has its own isolated set.
  boards: Record<string, BoardFlags>
  setMines: (mines: number) => void
  toggleMarks: () => void
  cycleFlag: (boardId: string, key: string) => void
}

// Number of cells flagged in a board (question marks excluded).
export const flagCount = (flags: BoardFlags = {}): number =>
  Object.values(flags).filter((state) => state === 'flag').length

export const useFlagStore = create<FlagStore>((set) => ({
  mines: 0,
  marks: true,
  boards: {},
  setMines: (mines) => set({ mines }),
  toggleMarks: () => set((state) => ({ marks: !state.marks })),
  cycleFlag: (boardId, key) =>
    set((state) => {
      const boardFlags = { ...state.boards[boardId] }
      const current = boardFlags[key]
      if (current === 'flag') {
        // With marks on, flag -> question; otherwise flag -> none.
        if (state.marks) boardFlags[key] = 'question'
        else delete boardFlags[key]
      } else if (current === 'question') {
        delete boardFlags[key]
      } else if (flagCount(state.boards[boardId]) < state.mines) {
        // none -> flag, but only while under the mine count
        boardFlags[key] = 'flag'
      } else if (state.marks) {
        // mine count reached: can't add a flag, mark it as a question instead
        boardFlags[key] = 'question'
      }
      // marks off and at the mine cap: stays none
      return { boards: { ...state.boards, [boardId]: boardFlags } }
    }),
}))
