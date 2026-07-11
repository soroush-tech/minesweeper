import { useEffect, useRef, useState } from 'react'
import { useFlagStore } from '../../common/store/useFlagStore'

// Entries for a menu dropdown. These are visual only — `check` renders a
// leading ✓, `shortcut` right-aligns a hint, and a null entry is a separator.
type MenuEntry = {
  label: string
  check?: boolean
  shortcut?: string
} | null

const gameMenuEntries: MenuEntry[] = [
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

const helpMenuEntries: MenuEntry[] = [
  { label: 'Help Topics' },
  null,
  { label: 'About Minesweeper' },
]

// Difficulty entries show a ✓ against the active one instead of a static check.
const difficultyLabels = ['Beginner', 'Intermediate', 'Expert', 'Custom...']

type Menu = 'game' | 'help'

type WindowBarProps = {
  onSelect?: (label: string) => void
  activeDifficulty?: string
}

// The classic Windows Minesweeper menu bar with "Game" and "Help" dropdowns.
// Only one is open at a time; selecting an entry invokes `onSelect`.
export const WindowBar = ({ onSelect, activeDifficulty }: WindowBarProps) => {
  const [openMenu, setOpenMenu] = useState<Menu | null>(null)
  const menuBarRef = useRef<HTMLDivElement>(null)
  const marks = useFlagStore((state) => state.marks)
  const toggleMarks = useFlagStore((state) => state.toggleMarks)
  const color = useFlagStore((state) => state.color)
  const toggleColor = useFlagStore((state) => state.toggleColor)

  useEffect(() => {
    if (!openMenu) return
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuBarRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openMenu])

  // Accelerators: G opens the Game menu, H the Help menu; F2 (reset) closes both.
  // Keystrokes aimed at a text field are ignored.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const key = event.key.toLowerCase()
      if (key === 'g') setOpenMenu((menu) => (menu === 'game' ? null : 'game'))
      else if (key === 'h') setOpenMenu((menu) => (menu === 'help' ? null : 'help'))
      else if (event.key === 'F2') setOpenMenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleSelect = (label: string) => {
    setOpenMenu(null)
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

  const renderMenu = (menu: Menu, label: string, entries: MenuEntry[]) => (
    <span className="menuItemWrapper">
      <span
        className={`menuItem${openMenu === menu ? ' active' : ''}`}
        onClick={() => setOpenMenu((current) => (current === menu ? null : menu))}
      >
        {label}
      </span>
      {openMenu === menu && (
        <div className="menuDropdown" role="menu">
          {entries.map((entry, index) =>
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
  )

  return (
    <div className="menuBar" ref={menuBarRef}>
      {renderMenu('game', 'Game', gameMenuEntries)}
      {renderMenu('help', 'Help', helpMenuEntries)}
    </div>
  )
}
