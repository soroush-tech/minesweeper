import { useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../utils/api/client'
import { useBoard } from './useBoard'
import { type Board } from '../../utils/generateMinesweeperGrid'
import { type Update } from '../../utils/mineField'

export const useBoardMutation = () => {
  const { result } = useBoard()
  const id = result?.data?.id || 'new'
  const config = {
    url: `/board/${id}`,
    method: 'post',
  }
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Update) => client.call<Board, Board>({ data, ...config }),
    onSuccess: (data) => {
      queryClient.setQueryData<Board>(['board', id], (oldData) => {
        return {
          ...oldData,
          ...data,
        }
      })
      // queryClient.invalidateQueries(['board', board?.id])
    },
  })
}
