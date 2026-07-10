import { useState } from 'react'
import './minesweeper.css'
import windowIcon from '../../assets/window-icon.svg'
import { Window } from '../../common/components/Window'
import { WindowBar } from './WindowBar'
import { CustomField } from './CustomField'
import { Board } from './Board'

const defaultOptions = {
  cells: 9,
  rows: 9,
  mines: 10,
}

export const MineSweeper = () => {
  const [customOpen, setCustomOpen] = useState(false)

  return (
    <div className="minesweeper">
      <Window title="Minesweeper" icon={windowIcon}>
        <WindowBar onCustom={() => setCustomOpen(true)} />
        <Board options={defaultOptions} />
      </Window>
      {customOpen && <CustomField onClose={() => setCustomOpen(false)} />}
    </div>
  )
}
