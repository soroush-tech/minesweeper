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

  it('moves the window when dragging the title bar', () => {
    const { container } = render(<Window title="Minesweeper">content</Window>)
    const win = container.querySelector('.window') as HTMLElement
    const titleBar = container.querySelector('.titleBar') as HTMLElement
    expect(win.style.transform).toBe('translate(0px, 0px)')

    fireEvent.mouseDown(titleBar, { clientX: 10, clientY: 10 })
    fireEvent.mouseMove(document, { clientX: 60, clientY: 40 })
    fireEvent.mouseUp(document)

    expect(win.style.transform).toBe('translate(50px, 30px)')
  })

  it('does not start a drag when pressing a title-bar button', () => {
    const { container } = render(<Window title="Minesweeper">content</Window>)
    const win = container.querySelector('.window') as HTMLElement
    const button = container.querySelector('.windowButton') as HTMLElement

    fireEvent.mouseDown(button, { clientX: 10, clientY: 10 })
    fireEvent.mouseMove(document, { clientX: 60, clientY: 40 })

    expect(win.style.transform).toBe('translate(0px, 0px)')
  })
})
