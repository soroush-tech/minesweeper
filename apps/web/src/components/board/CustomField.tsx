import { useState } from 'react'
import { type Options } from '../../utils/generateMinesweeperGrid'
import { Window } from '../../common/components/Window'

type CustomFieldProps = {
  onSubmit: (options: Options) => void
  onClose: () => void
}

const MAX_HEIGHT = 30
const MAX_WIDTH = 24
const MIN_MINES = 10

const clamp = (value: string, min: number, max: number) =>
  Math.min(Math.max(Math.floor(Number(value)) || min, min), max)

// The classic "Custom Field" dialog. OK applies the entered dimensions as a new
// board; Cancel and the title-bar close button dismiss it without changes.
export const CustomField = ({ onSubmit, onClose }: CustomFieldProps) => {
  const [height, setHeight] = useState('8')
  const [width, setWidth] = useState('8')
  const [mines, setMines] = useState('10')

  // Out-of-range values fall back to the limits: up to 30 rows and 24 columns,
  // and between 10 mines and one fewer than there are cells.
  const handleOk = () => {
    const rows = clamp(height, 1, MAX_HEIGHT)
    const cells = clamp(width, 1, MAX_WIDTH)
    onSubmit({ rows, cells, mines: clamp(mines, MIN_MINES, rows * cells - 1) })
  }

  return (
    <Window title="Custom Field" variant="dialog" onClose={onClose}>
      <div className="customFieldBody">
        <div className="customFieldFields">
          <label className="customFieldRow">
            <span>Height:</span>
            <input
              type="number"
              min="1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <label className="customFieldRow">
            <span>Width:</span>
            <input type="number" min="1" value={width} onChange={(e) => setWidth(e.target.value)} />
          </label>
          <label className="customFieldRow">
            <span>Mines:</span>
            <input type="number" min="1" value={mines} onChange={(e) => setMines(e.target.value)} />
          </label>
        </div>
        <div className="customFieldButtons">
          <button className="windowButton dialogButton" onClick={handleOk}>
            OK
          </button>
          <button className="windowButton dialogButton" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Window>
  )
}
