import { Window } from '../../common/components/Window'

type AboutWindowProps = {
  onClose: () => void
}

// The "About Minesweeper" dialog, opened from the Help menu.
export const AboutWindow = ({ onClose }: AboutWindowProps) => {
  return (
    <Window title="About Minesweeper" variant="dialog" onClose={onClose}>
      <div className="helpBody">
        <p>Minesweeper</p>
        <p>A faithful remake of the classic Windows game.</p>
        <p>Built with React &amp; TypeScript — play at minesweeper.is</p>
        <div className="helpButtons">
          <button className="windowButton dialogButton" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </Window>
  )
}
