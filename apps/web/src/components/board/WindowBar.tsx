import { useEffect, useRef, useState } from 'react'
import { useFlagStore } from '../../common/store/useFlagStore'

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
  { label: 'Beginner' },
  { label: 'Intermediate' },
  { label: 'Expert' },
  { label: 'Custom...' },
  null,
  { label: 'Marks (?)' },
  { label: 'Color' },
  null,
  { label: 'Best Times...' },
  null,
  { label: 'Exit' },
]

// Difficulty entries show a ✓ against the active one instead of a static check.
const difficultyLabels = ['Beginner', 'Intermediate', 'Expert', 'Custom...']

type WindowBarProps = {
  onSelect?: (label: string) => void
  activeDifficulty?: string
}

// The classic Windows Minesweeper menu bar with the "Game" dropdown. Selecting
// an entry invokes `onSelect`; the active difficulty is marked with a ✓.
export const WindowBar = ({ onSelect, activeDifficulty }: WindowBarProps) => {
  const [gameMenuOpen, setGameMenuOpen] = useState(false)
  const gameMenuRef = useRef<HTMLSpanElement>(null)
  const marks = useFlagStore((state) => state.marks)
  const toggleMarks = useFlagStore((state) => state.toggleMarks)
  const color = useFlagStore((state) => state.color)
  const toggleColor = useFlagStore((state) => state.toggleColor)

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
    if (label === 'Marks (?)') return toggleMarks()
    if (label === 'Color') return toggleColor()
    onSelect?.(label)
  }

  const isChecked = (entry: { label: string; check?: boolean }) => {
    if (entry.label === 'Marks (?)') return marks
    if (entry.label === 'Color') return color
    if (difficultyLabels.includes(entry.label)) return entry.label === activeDifficulty
    return !!entry.check
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
                  <span className="menuCheck">{isChecked(entry) ? '✓' : ''}</span>
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
