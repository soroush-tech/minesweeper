import { useEffect, useState } from 'react'
import { Options } from '../../utils/generateMinesweeperGrid.ts'
import { useBoardQuery } from './useBoardQuery.ts'
import { useQueryClient } from '@tanstack/react-query'

export const useBoard = (options?: Options) => {
  const [id, setId] = useState<string>('new')
  const result = useBoardQuery(id, options)
  const queryClient = useQueryClient()
  const changeBoard = async (id: string) => {
    await queryClient.invalidateQueries({ queryKey: ['board', 'new'] })
    await queryClient.invalidateQueries({ queryKey: ['board', id] })
    await queryClient.refetchQueries({ queryKey: ['board', id] })
    setId(id)
  }
  useEffect(() => {
    if (!result.isFetched) {
      return
    }
    if (result?.data?.id && id !== null && id !== result?.data?.id) {
      setId(result.data.id)
    }
  }, [result?.data?.id, result.isFetched, id])

  return { result, changeBoard }
}
