import { useEffect, useRef, useState } from 'react'

// Entries for the classic Windows Minesweeper "Game" dropdown. These are
// visual only — `check` renders a leading ✓, `shortcut` right-aligns a hint,
// and a null entry renders a separator line.
type GameMenuEntry = {
  label: string
  check?: boolean
  shortcut?: string
} | null

const gameMenuEntries: GameMenuEntry[] = [
  { label: 'New', shortcut: 'F2' },
  null,
  { label: 'Beginner', check: true },
  { label: 'Intermediate' },
  { label: 'Expert' },
  { label: 'Custom...' },
  null,
  { label: 'Marks (?)', check: true },
  { label: 'Color', check: true },
  null,
  { label: 'Best Times...' },
  null,
  { label: 'Exit' },
]

type WindowBarProps = {
  onCustom?: () => void
}

// The classic Windows Minesweeper menu bar with the "Game" dropdown. The
// entries are visual only, except "Custom..." which invokes `onCustom`.
export const WindowBar = ({ onCustom }: WindowBarProps) => {
  const [gameMenuOpen, setGameMenuOpen] = useState(false)
  const gameMenuRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!gameMenuOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (!gameMenuRef.current?.contains(event.target as Node)) {
        setGameMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [gameMenuOpen])

  const handleSelect = (label: string) => {
    setGameMenuOpen(false)
    if (label === 'Custom...') onCustom?.()
  }

  return (
    <div className="menuBar">
      <span className="menuItemWrapper" ref={gameMenuRef}>
        <span
          className={`menuItem${gameMenuOpen ? ' active' : ''}`}
          onClick={() => setGameMenuOpen((open) => !open)}
        >
          Game
        </span>
        {gameMenuOpen && (
          <div className="menuDropdown" role="menu">
            {gameMenuEntries.map((entry, index) =>
              entry === null ? (
                <div key={`separator-${index}`} className="menuSeparator" />
              ) : (
                <div
                  key={entry.label}
                  className="menuDropdownItem"
                  role="menuitem"
                  onClick={() => handleSelect(entry.label)}
                >
                  <span className="menuCheck">{entry.check ? '✓' : ''}</span>
                  <span className="menuLabel">{entry.label}</span>
                  <span className="menuShortcut">{entry.shortcut ?? ''}</span>
                </div>
              ),
            )}
          </div>
        )}
      </span>
      <span className="menuItem">Help</span>
    </div>
  )
}
