import { getRandomInt } from './getRandomInt'
import { toNumber } from './toNumber'
import { processNeighboringCells } from './processNeighboringCells'
import { revealMinesweeperGrid } from './revealMinesweeperGrid'

export type HasRevealed = boolean
export type HasFlag = boolean
export type MinesCount = number // -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type X = string | number
export type Y = string | number
export type Cell = [MinesCount, HasRevealed, HasFlag]
export type Field = Cell[][]
export type Position = [X, Y]
export type Actions = [HasRevealed, HasFlag]
export interface Options {
  rows: number
  cells: number
  mines: number
}
export interface Board {
  id: string
  options: Options
  field: Field
  start: string | null
  end: string | null
}

export const countMine = (field: Field, [cell, row]: Position, options: Options): number => {
  let mineCount = 0
  processNeighboringCells([cell, row], options, ([selectedCell, selectedRow]) => {
    const x = Number(selectedCell)
    const y = Number(selectedRow)
    const isMine = field[y][x][0] === -1
    if (isMine) {
      mineCount++
    }
  })
  return mineCount
}
export const createField = (rows: number, cells: number): Field => {
  // Create the grid initialized with [zeros as mineCount, false as isRevealed, flagState]
  return Array.from({ length: rows }, () => {
    return Array.from({ length: cells }, () => [0, false, false])
  })
}
export const generateMinesweeperGrid = (
  options: Options,
  [x, y]: Position | [] = [],
  [hasRevealed, hasFlag]: Actions | [] = [],
) => {
  const cells = Number(options.cells)
  const rows = Number(options.rows)
  const mines = Number(options.mines)
  const field = createField(rows, cells)
  const isSelectedCellExist = !((x == null && y == null) || x === '' || y === '')
  if (!isSelectedCellExist) {
    return field
  }
  // Assign mine to cells
  const numX = toNumber(x)
  const numY = toNumber(y)

  const selectedCell = field[numY][numX]
  const hasSelectedCell = Array.isArray(selectedCell)
  if (hasSelectedCell && hasFlag != null) {
    field[numY][numX][2] = hasFlag // flagged
  }

  // Place mines
  let minesPlaced = 0
  while (minesPlaced < mines) {
    const row = getRandomInt(0, rows - 1)
    const cell = getRandomInt(0, cells - 1)
    const isSelectedCell = row === numY && cell === numX
    const isMine = field[row][cell][0] === -1
    if (!isSelectedCell && !isMine) {
      // Ensure we don't place more than one mine in a cells
      field[row][cell][0] = -1
      ++minesPlaced
      processNeighboringCells([cell, row], options, ([cell, row]) => {
        const x = Number(cell)
        const y = Number(row)
        if (field[y][x][0] >= 0) {
          field[y][x][0] = countMine(field, [cell, row], options)
        }
      })
    }
  }

  return !hasRevealed ? field : revealMinesweeperGrid(field, options, [numX, numY])
}
