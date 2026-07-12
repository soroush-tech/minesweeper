import { render, screen, fireEvent } from '@testing-library/react'
import { HelpWindow } from './HelpWindow'

describe('HelpWindow', () => {
  it('renders help content', () => {
    render(<HelpWindow onClose={vi.fn()} />)
    expect(screen.getByText('Help')).toBeInTheDocument()
    expect(screen.getByText(/Left-click a cell/)).toBeInTheDocument()
  })

  it('closes from OK and the title-bar close button', () => {
    const onClose = vi.fn()
    render(<HelpWindow onClose={onClose} />)

    fireEvent.click(screen.getByText('OK'))
    fireEvent.click(screen.getByAltText('close'))

    expect(onClose).toHaveBeenCalledTimes(2)
  })
})
