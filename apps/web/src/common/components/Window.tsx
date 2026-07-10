import { type ReactNode } from 'react'
import './window.css'

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
              <span className="windowButton">—</span>
              <span className="windowButton">🗖</span>
              <span className="windowButton">✕</span>
            </>
          ) : (
            <span className="windowButton" onClick={onClose}>
              ✕
            </span>
          )}
        </span>
      </div>
      {children}
    </div>
  )
}
