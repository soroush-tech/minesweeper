import { type Cell } from './generateMinesweeperGrid.ts'

// hide value if is not revealed or reveal mine if game  is over
export const transformCellForClient = (
  [value, isRevealed, ...others]: Cell,
  isGameOver: boolean,
): Cell => {
  const isMine = value < 0
  const newValue = isRevealed || (isGameOver && isMine) ? value : 0
  return [newValue, isRevealed, ...others]
}
