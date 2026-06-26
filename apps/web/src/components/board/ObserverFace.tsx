import { type Board } from '../../utils/generateMinesweeperGrid'
import { emoji } from '../../common/consts'
import { getRandomInt } from '../../utils/getRandomInt'

interface ObserverFaceProps {
  board: Board
  changeBoard: (id: string) => Promise<void>
}
export const ObserverFace = ({ board, changeBoard }: ObserverFaceProps) => {
  const initLoading = emoji.initLoading[getRandomInt(0, emoji.initLoading.length)]
  const state = emoji.status[0]
  // const isLoading = emoji.isLoading[getRandomInt(0, emoji.isLoading.length)]
  return (
    <div
      className="observerFace"
      onClick={() => {
        changeBoard('new').catch(console.error)
      }}
    >
      {board?.id ? state : initLoading}
    </div>
  )
}
