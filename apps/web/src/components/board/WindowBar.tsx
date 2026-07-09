import windowIcon from '../../assets/window-icon.svg'

// Decorative window chrome mimicking the classic Windows Minesweeper title
// and menu bars. The buttons and menu entries are visual only.
export const WindowBar = () => (
  <div className="windowBar">
    <div className="titleBar">
      <img className="icon" src={windowIcon} alt="" />
      <span className="title">Minesweeper</span>
      <span className="windowButtons">
        <span className="windowButton">—</span>
        <span className="windowButton">🗖</span>
        <span className="windowButton">✕</span>
      </span>
    </div>
    <div className="menuBar">
      <span className="menuItem">Game</span>
      <span className="menuItem">Help</span>
    </div>
  </div>
)
