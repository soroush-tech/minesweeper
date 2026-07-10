import { render, screen, fireEvent } from '@testing-library/react'
import { WindowBar } from './WindowBar'

describe('WindowBar', () => {
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
})
