import { type MouseEvent as ReactMouseEvent, type ReactNode, useRef, useState } from 'react'
import './window.css'
import minimizeIcon from '../../assets/window-minimize.svg'
import maximizeIcon from '../../assets/window-maximize.svg'
import closeIcon from '../../assets/window-close.svg'

type WindowProps = {
  title: string
  icon?: string
  // 'app' shows the classic minimize/maximize/close buttons (decorative).
  // 'dialog' shows a single close button wired to `onClose`.
  variant?: 'app' | 'dialog'
  onClose?: () => void
  children: ReactNode
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

// Reusable classic Windows window chrome: the raised frame plus a title bar
// with an optional icon, the title, and the top-right buttons. Drag the title
// bar to move the window; it stays within the viewport.
export const Window = ({ title, icon, variant = 'app', onClose, children }: WindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleTitleBarMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    // Let the top-right buttons handle their own clicks without starting a drag.
    if ((event.target as HTMLElement).closest('.windowButtons')) return
    const element = windowRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    // Position of the window with the current transform removed.
    const base = { left: rect.left - offset.x, top: rect.top - offset.y }
    const startX = event.clientX
    const startY = event.clientY
    const startOffset = { ...offset }

    const onMouseMove = (moveEvent: MouseEvent) => {
      const maxX = window.innerWidth - rect.width
      const maxY = window.innerHeight - rect.height
      setOffset({
        x: clamp(startOffset.x + (moveEvent.clientX - startX), -base.left, maxX - base.left),
        y: clamp(startOffset.y + (moveEvent.clientY - startY), -base.top, maxY - base.top),
      })
    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      ref={windowRef}
      className={`window${variant === 'dialog' ? ' dialog' : ''}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <div className="titleBar" onMouseDown={handleTitleBarMouseDown}>
        {icon && <img className="icon" src={icon} alt="" />}
        <span className="title">{title}</span>
        <span className="windowButtons">
          {variant === 'app' ? (
            <>
              <span className="windowButton">
                <img src={minimizeIcon} alt="minimize" />
              </span>
              <span className="windowButton disabled">
                <img src={maximizeIcon} alt="maximize" />
              </span>
              <span className="windowButton">
                <img src={closeIcon} alt="close" />
              </span>
            </>
          ) : (
            <span className="windowButton" onClick={onClose}>
              <img src={closeIcon} alt="close" />
            </span>
          )}
        </span>
      </div>
      {children}
    </div>
  )
}
