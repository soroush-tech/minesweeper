import { useState } from 'react'
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

  // Adjust the active id to the freshly created board during render — React's
  // supported alternative to syncing state from fetched data in an effect.
  const fetchedId = result.data?.id
  if (result.isFetched && fetchedId && id !== fetchedId) {
    setId(fetchedId)
  }

  return { result, changeBoard }
}
