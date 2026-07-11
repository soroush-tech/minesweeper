import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import './minesweeper.css'
import windowIcon from '../../assets/window-icon.svg'
import { type Options } from '../../utils/generateMinesweeperGrid'
import { useFlagStore } from '../../common/store/useFlagStore'
import { Window } from '../../common/components/Window'
import { WindowBar } from './WindowBar'
import { CustomField } from './CustomField'
import { HelpWindow } from './HelpWindow'
import { AboutWindow } from './AboutWindow'
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
  const [helpOpen, setHelpOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  // Start a fresh board of the given size. Remounting Board (via the changed
  // key) resets its query id to 'new', and dropping the cached 'new' board
  // forces a refetch so the mock regenerates the field at the new dimensions.
  const startGame = useCallback(
    (label: string, newOptions: Options) => {
      setOptions(newOptions)
      setDifficulty(label)
      queryClient.removeQueries({ queryKey: ['board', 'new'] })
      setGeneration((value) => value + 1)
    },
    [queryClient],
  )

  // F2 starts a new game (Game/Help menu accelerators live in WindowBar).
  // Ignore keystrokes aimed at a text field (e.g. the Custom Field inputs).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (event.key === 'F2') {
        event.preventDefault()
        startGame(difficulty, options)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [difficulty, options, startGame])

  const handleSelect = (label: string) => {
    if (label === 'New') {
      // Restart the current difficulty — same as clicking the reset face.
      startGame(difficulty, options)
      return
    }
    if (label === 'Custom...') {
      setCustomOpen(true)
      return
    }
    if (label === 'Help Topics') {
      setHelpOpen(true)
      return
    }
    if (label === 'About Minesweeper') {
      setAboutOpen(true)
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
      {helpOpen && <HelpWindow onClose={() => setHelpOpen(false)} />}
      {aboutOpen && <AboutWindow onClose={() => setAboutOpen(false)} />}
    </div>
  )
}
