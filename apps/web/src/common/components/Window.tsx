import { type ReactNode } from 'react'
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

// Reusable classic Windows window chrome: the raised frame plus a title bar
// with an optional icon, the title, and the top-right buttons.
export const Window = ({ title, icon, variant = 'app', onClose, children }: WindowProps) => {
  return (
    <div className={`window${variant === 'dialog' ? ' dialog' : ''}`}>
      <div className="titleBar">
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
