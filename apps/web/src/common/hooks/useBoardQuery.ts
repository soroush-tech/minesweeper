import { useCustomQuery } from './useCustomQuery.ts'
import { type Options as Params, type Board } from '../../utils/generateMinesweeperGrid.ts'

const defaultParams = {
  cells: 9,
  rows: 9,
  mines: 10,
}
export const useBoardQuery = (id: string, params: Params = defaultParams) => {
  const config = {
    url: `/board/${id}`,
    method: 'get',
    params,
  }
  return useCustomQuery<Board, Board>({
    queryKey: ['board', id],
    config,
  })
}
