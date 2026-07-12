import { Window } from '../../common/components/Window'

type HelpWindowProps = {
  onClose: () => void
}

// A small Help dialog, opened from the "Help" menu or the H shortcut.
export const HelpWindow = ({ onClose }: HelpWindowProps) => {
  return (
    <Window title="Help" variant="dialog" onClose={onClose}>
      <div className="helpBody">
        <p>Clear every cell that isn&apos;t a mine.</p>
        <ul>
          <li>Left-click a cell to reveal it.</li>
          <li>Right-click to flag a mine — again for a ? when Marks is on.</li>
          <li>A number is how many mines touch that cell.</li>
          <li>Click the face (or press F2) to start a new game.</li>
        </ul>
        <div className="helpButtons">
          <button className="windowButton dialogButton" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </Window>
  )
}
