import { useState } from 'react'
import { type Options } from '../../utils/generateMinesweeperGrid'
import { Window } from '../../common/components/Window'

type CustomFieldProps = {
  onSubmit: (options: Options) => void
  onClose: () => void
}

// The classic "Custom Field" dialog. OK applies the entered dimensions as a new
// board; Cancel and the title-bar close button dismiss it without changes.
export const CustomField = ({ onSubmit, onClose }: CustomFieldProps) => {
  const [height, setHeight] = useState('8')
  const [width, setWidth] = useState('8')
  const [mines, setMines] = useState('10')

  const handleOk = () =>
    onSubmit({ rows: Number(height), cells: Number(width), mines: Number(mines) })

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
