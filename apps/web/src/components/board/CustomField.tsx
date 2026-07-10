import { useState } from 'react'
import { Window } from '../../common/components/Window'

type CustomFieldProps = {
  onClose: () => void
}

// The classic "Custom Field" dialog. Inputs are editable but visual only —
// OK, Cancel, and the title-bar close button all simply dismiss the dialog.
export const CustomField = ({ onClose }: CustomFieldProps) => {
  const [height, setHeight] = useState('8')
  const [width, setWidth] = useState('8')
  const [mines, setMines] = useState('10')

  return (
    <Window title="Custom Field" variant="dialog" onClose={onClose}>
      <div className="customFieldBody">
        <div className="customFieldFields">
          <label className="customFieldRow">
            <span>Height:</span>
            <input value={height} onChange={(e) => setHeight(e.target.value)} />
          </label>
          <label className="customFieldRow">
            <span>Width:</span>
            <input value={width} onChange={(e) => setWidth(e.target.value)} />
          </label>
          <label className="customFieldRow">
            <span>Mines:</span>
            <input value={mines} onChange={(e) => setMines(e.target.value)} />
          </label>
        </div>
        <div className="customFieldButtons">
          <button className="windowButton dialogButton" onClick={onClose}>
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
