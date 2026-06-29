import { type Field } from './generateMinesweeperGrid.ts'

// Win when every non-mine cell has been revealed
export const isWin = (field: Field): boolean =>
  field.every((row) => row.every(([value, isRevealed]) => value === -1 || isRevealed))
