// LED segment colors resolve from the active theme's CSS variables (see
// minesweeper.css), with the classic values as fallbacks.
const on_ = 'var(--led-on, #c00)' // active color
const off = 'var(--led-off, #600000)' // inactive color
const def = 'var(--led-def, #1e262e)' // default color
export type DigitKeys =
  '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'default' | 'key'
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
