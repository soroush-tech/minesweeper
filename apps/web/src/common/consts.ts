const on_ = '#c00' // active color
const off = '#600000' // inActive color
const def = '#1E262E' // default color
export type DigitKeys =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'default'
  | 'key'
export const segmentMap: Record<DigitKeys, string[]> = {
  key: ['top', 'middle', 'bottom', 'rightTop', 'rightBottom', 'leftTop', 'leftBottom'],
  default: [def, def, def, def, def, def, def],
  '0': [on_, off, on_, on_, on_, on_, on_],
  '1': [off, off, off, on_, on_, off, off],
  '2': [on_, on_, on_, on_, off, off, on_],
  '3': [on_, on_, on_, on_, on_, off, off],
  '4': [off, on_, off, on_, on_, on_, off],
  '5': [on_, on_, on_, off, on_, on_, off],
  '6': [on_, on_, on_, off, on_, on_, on_],
  '7': [on_, off, off, on_, on_, off, off],
  '8': [on_, on_, on_, on_, on_, on_, on_],
  '9': [on_, on_, on_, on_, on_, on_, off],
}

export const emoji = {
  status: [
    '🙂', // default
    '😎', // isFinished
    '🥳', // isWinn
    '😵', // isLose
    '🥱', // isAway
    '😴', // isTimout +999s
  ],
  initLoading: ['🏗️', '🏖️', '🗺️', '🚀', '🛸', ' 🚑', '🚂'],
  isLoading: [
    '😇',
    '☺️',
    '😎',
    '🤓',
    '🤤',
    '🤤',
    '🫢',
    '🤭',
    '😝',
    '😋',
    '🧐',
    '😴',
    '😵',
    '🤯',
    '😵‍💫',
    '🥶',
    '🥵',
    '🤕',
    '🥺',
    '😳',
  ],
}
