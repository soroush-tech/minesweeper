import { useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../utils/api/client'
import { type Board } from '../../utils/generateMinesweeperGrid'
import { type Update } from '../../utils/mineField'

// `boardId` is the id of the board being played. Taking it as an argument (the
// caller already knows it) avoids a second useBoard() observer that would race
// the board query with default options and pin every new game to 9×9.
export const useBoardMutation = (boardId: string = 'new') => {
  const config = {
    url: `/board/${boardId}`,
    method: 'post',
  }
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Update) => client.call<Board, Board>({ data, ...config }),
    onSuccess: (data) => {
      queryClient.setQueryData<Board>(['board', boardId], (oldData) => {
        return {
          ...oldData,
          ...data,
        }
      })
    },
  })
}
