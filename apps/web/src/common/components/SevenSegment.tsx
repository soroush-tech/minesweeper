import './display.css'
import { segmentMap } from '../consts'
interface SevenSegment {
  width?: number
  height?: number
  characters: string
}
export const SevenSegment = ({ width = 20, height = 40, characters }: SevenSegment) => {
  const [top, middle, bottom, rightTop, rightBottom, leftTop, leftBottom] =
    segmentMap[characters as keyof typeof segmentMap] || segmentMap.default
  return (
    <div className="seven-segment">
      <svg
        width={width}
        height={height}
        style={{
          shapeRendering: 'geometricPrecision',
          textRendering: 'geometricPrecision',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        }}
        viewBox="0 0 4.50183 8.61276"
      >
        <rect fill="black" width="4.50183" height="8.61276" />
        <g id="seven-segment">
          <polygon
            id="top"
            fill={top}
            points="0.156546,0.000883515 1.39867,1.21768 3.11825,1.21761 4.34529,0"
          />
          <polygon
            id="bottom"
            fill={bottom}
            points="0.156546,8.61188 1.39867,7.39508 3.11825,7.39515 4.34529,8.61276 "
          />
          <polygon
            id="middle"
            fill={middle}
            points="0.156546,4.27664 1.39867,4.98328 3.11825,4.98322 4.34519,4.27621 4.34529,
            4.27621 4.34522,4.27618 4.34529,4.27615 4.34519,4.27615 3.11825,3.56914 1.39867,
            3.56907 0.156546,4.27572 4.06603,4.27618"
          />
          <polygon
            id="right_bottom"
            fill={rightBottom}
            points="4.50095,8.49516 3.28415,7.25303 3.28422,5.53345 4.50183,4.30641"
          />
          <polygon
            id="left_bottom"
            fill={leftBottom}
            points="0.000883515,8.49516 1.21768,7.25303 1.21761,5.53345 0,4.30641"
          />
          <polygon
            id="right_top"
            fill={rightTop}
            points="4.50095,4.30632 3.28415,3.06419 3.28422,1.34461 4.50183,0.117573"
          />
          <polygon
            id="left_top"
            fill={leftTop}
            points="0.000883515,4.30632 1.21768,3.06419 1.21761,1.34461 0,0.117573"
          />
        </g>
      </svg>
    </div>
  )
}
