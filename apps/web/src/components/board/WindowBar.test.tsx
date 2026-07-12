import { render, screen, fireEvent } from '@testing-library/react'
import { WindowBar } from './WindowBar'
import { useFlagStore } from '../../common/store/useFlagStore'

const markCheckFor = (label: string) =>
  screen.getByText(label).closest('.menuDropdownItem')?.querySelector('.menuCheck')?.textContent

describe('WindowBar', () => {
  beforeEach(() => useFlagStore.setState({ marks: true, color: true }))

  it('keeps the Game dropdown closed by default', () => {
    render(<WindowBar />)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens the Game dropdown on click with the expected entries', () => {
    render(<WindowBar />)
    fireEvent.click(screen.getByText('Game'))

    expect(screen.getByRole('menu')).toBeInTheDocument()
    const labels = screen
      .getAllByRole('menuitem')
      .map((item) => item.querySelector('.menuLabel')?.textContent)
    expect(labels).toEqual([
      'New',
      'Beginner',
      'Intermediate',
      'Expert',
      'Custom...',
      'Marks (?)',
      'Color',
      'Best Times...',
      'Exit',
    ])
  })

  it('checks the active difficulty alongside Marks and Color, and shows the shortcut', () => {
    render(<WindowBar activeDifficulty="Expert" />)
    fireEvent.click(screen.getByText('Game'))

    const checked = screen
      .getAllByRole('menuitem')
      .filter((item) => item.querySelector('.menuCheck')?.textContent === '✓')
      .map((item) => item.querySelector('.menuLabel')?.textContent)
    expect(checked).toEqual(['Expert', 'Marks (?)', 'Color'])
    expect(screen.getByText('F2')).toBeInTheDocument()
  })

  it('toggles the dropdown closed on a second Game click', () => {
    render(<WindowBar />)
    fireEvent.click(screen.getByText('Game'))
    fireEvent.click(screen.getByText('Game'))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes the dropdown when clicking outside', () => {
    render(<WindowBar />)
    fireEvent.click(screen.getByText('Game'))
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('fires onSelect with the chosen entry and closes the dropdown', () => {
    const onSelect = vi.fn()
    render(<WindowBar onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Game'))
    fireEvent.click(screen.getByText('Expert'))

    expect(onSelect).toHaveBeenCalledWith('Expert')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('fires onSelect with "Custom..." when Custom is clicked', () => {
    const onSelect = vi.fn()
    render(<WindowBar onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Game'))
    fireEvent.click(screen.getByText('Custom...'))

    expect(onSelect).toHaveBeenCalledWith('Custom...')
  })

  it('toggles the Marks (?) option without firing onSelect', () => {
    const onSelect = vi.fn()
    render(<WindowBar onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Game'))
    expect(markCheckFor('Marks (?)')).toBe('✓')

    fireEvent.click(screen.getByText('Marks (?)'))
    expect(useFlagStore.getState().marks).toBe(false)
    expect(onSelect).not.toHaveBeenCalled()

    fireEvent.click(screen.getByText('Game'))
    expect(markCheckFor('Marks (?)')).toBe('')
  })

  it('opens the Game dropdown with the G key', () => {
    render(<WindowBar />)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'g' })
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('opens the Help dropdown on click with its entries', () => {
    const onSelect = vi.fn()
    render(<WindowBar onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Help'))

    const labels = screen
      .getAllByRole('menuitem')
      .map((item) => item.querySelector('.menuLabel')?.textContent)
    expect(labels).toEqual(['Help Topics', 'About Minesweeper'])
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('fires onSelect for Help Topics and About Minesweeper', () => {
    const onSelect = vi.fn()
    render(<WindowBar onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Help'))
    fireEvent.click(screen.getByText('Help Topics'))
    expect(onSelect).toHaveBeenCalledWith('Help Topics')

    fireEvent.click(screen.getByText('Help'))
    fireEvent.click(screen.getByText('About Minesweeper'))
    expect(onSelect).toHaveBeenCalledWith('About Minesweeper')
  })

  it('opens the Help dropdown with the H key', () => {
    render(<WindowBar />)
    fireEvent.keyDown(document, { key: 'h' })
    expect(screen.getByText('Help Topics')).toBeInTheDocument()
  })

  it('opens only one menu at a time, and F2 closes any open menu', () => {
    render(<WindowBar />)
    fireEvent.click(screen.getByText('Game'))
    fireEvent.keyDown(document, { key: 'h' })
    expect(screen.queryByText('New')).not.toBeInTheDocument()
    expect(screen.getByText('Help Topics')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'F2' })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('toggles the Color option without firing onSelect', () => {
    const onSelect = vi.fn()
    render(<WindowBar onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Game'))
    expect(markCheckFor('Color')).toBe('✓')

    fireEvent.click(screen.getByText('Color'))
    expect(useFlagStore.getState().color).toBe(false)
    expect(onSelect).not.toHaveBeenCalled()

    fireEvent.click(screen.getByText('Game'))
    expect(markCheckFor('Color')).toBe('')
  })
})
