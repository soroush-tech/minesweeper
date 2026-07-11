import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import './minesweeper.css'
import windowIcon from '../../assets/window-icon.svg'
import { type Options } from '../../utils/generateMinesweeperGrid'
import { useFlagStore } from '../../common/store/useFlagStore'
import { Window } from '../../common/components/Window'
import { WindowBar } from './WindowBar'
import { CustomField } from './CustomField'
import { Board } from './Board'

// Classic difficulty presets: `rows` is the board height, `cells` the width.
const presets: Record<string, Options> = {
  Beginner: { rows: 9, cells: 9, mines: 10 },
  Intermediate: { rows: 16, cells: 16, mines: 40 },
  Expert: { rows: 16, cells: 30, mines: 99 },
}

export const MineSweeper = () => {
  const queryClient = useQueryClient()
  const color = useFlagStore((state) => state.color)
  const [options, setOptions] = useState<Options>(presets.Beginner)
  const [difficulty, setDifficulty] = useState('Beginner')
  const [generation, setGeneration] = useState(0)
  const [customOpen, setCustomOpen] = useState(false)

  // Start a fresh board of the given size. Remounting Board (via the changed
  // key) resets its query id to 'new', and dropping the cached 'new' board
  // forces a refetch so the mock regenerates the field at the new dimensions.
  const startGame = (label: string, newOptions: Options) => {
    setOptions(newOptions)
    setDifficulty(label)
    queryClient.removeQueries({ queryKey: ['board', 'new'] })
    setGeneration((value) => value + 1)
  }

  const handleSelect = (label: string) => {
    if (label === 'Custom...') {
      setCustomOpen(true)
      return
    }
    if (presets[label]) startGame(label, presets[label])
  }

  const applyCustom = (newOptions: Options) => {
    setCustomOpen(false)
    startGame('Custom...', newOptions)
  }

  return (
    <div className={`minesweeper${color ? '' : ' grayscale'}`}>
      <Window title="Minesweeper" icon={windowIcon}>
        <WindowBar onSelect={handleSelect} activeDifficulty={difficulty} />
        <Board key={generation} options={options} />
      </Window>
      {customOpen && <CustomField onSubmit={applyCustom} onClose={() => setCustomOpen(false)} />}
    </div>
  )
}
