import { render, screen, fireEvent } from '@testing-library/react'
import { AboutWindow } from './AboutWindow'

describe('AboutWindow', () => {
  it('renders the about content', () => {
    render(<AboutWindow onClose={vi.fn()} />)
    expect(screen.getByText('About Minesweeper')).toBeInTheDocument()
    expect(screen.getByText(/faithful remake/i)).toBeInTheDocument()
  })

  it('closes from OK and the title-bar close button', () => {
    const onClose = vi.fn()
    render(<AboutWindow onClose={onClose} />)

    fireEvent.click(screen.getByText('OK'))
    fireEvent.click(screen.getByAltText('close'))

    expect(onClose).toHaveBeenCalledTimes(2)
  })
})
