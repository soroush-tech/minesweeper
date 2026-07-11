import { render, screen, fireEvent } from '@testing-library/react'
import { Window } from './Window'

describe('Window', () => {
  it('renders the title and children', () => {
    render(
      <Window title="Minesweeper">
        <p>content</p>
      </Window>,
    )
    expect(screen.getByText('Minesweeper')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders the icon when provided', () => {
    render(
      <Window title="Minesweeper" icon="/icon.svg">
        <p>content</p>
      </Window>,
    )
    expect(document.querySelector('.titleBar .icon')).toHaveAttribute('src', '/icon.svg')
  })

  it('shows the minimize, maximize and close buttons for the app variant', () => {
    render(<Window title="Minesweeper">app</Window>)
    const alts = Array.from(document.querySelectorAll('.windowButton img')).map((img) =>
      img.getAttribute('alt'),
    )
    expect(alts).toEqual(['minimize', 'maximize', 'close'])
  })

  it('shows a single close button wired to onClose for the dialog variant', () => {
    const onClose = vi.fn()
    render(
      <Window title="Custom Field" variant="dialog" onClose={onClose}>
        dialog
      </Window>,
    )
    const buttons = document.querySelectorAll('.windowButton')
    expect(buttons).toHaveLength(1)
    fireEvent.click(buttons[0])
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
