import { directions } from './consts.ts'
import { Options, Position } from './generateMinesweeperGrid'

export const processNeighboringCells = (
  [cell, row]: Position,
  options: Options,
  cb: (position: Position) => void,
) => {
  for (const [dx, dy] of directions) {
    const selectedRow = Number(row) + dy
    const selectedCell = Number(cell) + dx
    if (
      selectedRow >= 0 &&
      selectedRow < options.rows &&
      selectedCell >= 0 &&
      selectedCell < options.cells
    ) {
      cb([selectedCell, selectedRow])
    }
  }
}
