import { type Board } from '../../utils/generateMinesweeperGrid'
import defaultFaceIcon from '../../assets/face-default.svg'
import winFaceIcon from '../../assets/face-win.svg'
import loseFaceIcon from '../../assets/face-lose.svg'

const faces = {
  default: { src: defaultFaceIcon, alt: 'smiling face' },
  win: { src: winFaceIcon, alt: 'sunglasses face' },
  lose: { src: loseFaceIcon, alt: 'x-eyes face' },
}

interface ObserverFaceProps {
  board: Board
  changeBoard: (id: string) => Promise<void>
}
export const ObserverFace = ({ board, changeBoard }: ObserverFaceProps) => {
  const isGameOver = board?.end != null
  const face = isGameOver ? (board.win ? faces.win : faces.lose) : faces.default
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
