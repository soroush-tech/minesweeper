import { type Board } from '../../utils/generateMinesweeperGrid'
import defaultFaceIcon from '../../assets/face-default.svg'
import winFaceIcon from '../../assets/face-win.svg'
import loseFaceIcon from '../../assets/face-lose.svg'
import surprisedFaceIcon from '../../assets/face-surprised.svg'

const faces = {
  default: { src: defaultFaceIcon, alt: 'smiling face' },
  win: { src: winFaceIcon, alt: 'sunglasses face' },
  lose: { src: loseFaceIcon, alt: 'x-eyes face' },
  surprised: { src: surprisedFaceIcon, alt: 'surprised face' },
}

interface ObserverFaceProps {
  board: Board
  changeBoard: (id: string) => Promise<void>
  // True while a move is being processed — shows the surprised face until the
  // API responds with the new board state.
  pending?: boolean
}
export const ObserverFace = ({ board, changeBoard, pending }: ObserverFaceProps) => {
  const isGameOver = board?.end != null
  const face = isGameOver
    ? board.win
      ? faces.win
      : faces.lose
    : pending
      ? faces.surprised
      : faces.default
  return (
    <div
      className="observerFace"
      onClick={() => {
        changeBoard('new').catch(console.error)
      }}
    >
      <img src={face.src} alt={face.alt} />
    </div>
  )
}
