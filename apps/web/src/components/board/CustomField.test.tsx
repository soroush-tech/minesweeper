import { render, screen, fireEvent } from '@testing-library/react'
import { CustomField } from './CustomField'

describe('CustomField', () => {
  it('renders the Height, Width and Mines fields with defaults', () => {
    render(<CustomField onSubmit={vi.fn()} onClose={vi.fn()} />)
    expect(screen.getByText('Height:')).toBeInTheDocument()
    expect(screen.getByText('Width:')).toBeInTheDocument()
    expect(screen.getByText('Mines:')).toBeInTheDocument()

    const inputs = document.querySelectorAll<HTMLInputElement>('.customFieldRow input')
    const values = Array.from(inputs).map((input) => input.value)
    expect(values).toEqual(['8', '8', '10'])
  })

  it('submits the entered dimensions as options when OK is clicked', () => {
    const onSubmit = vi.fn()
    render(<CustomField onSubmit={onSubmit} onClose={vi.fn()} />)
    const inputs = document.querySelectorAll<HTMLInputElement>('.customFieldRow input')
    fireEvent.change(inputs[0], { target: { value: '16' } })
    fireEvent.change(inputs[1], { target: { value: '30' } })
    fireEvent.change(inputs[2], { target: { value: '99' } })

    fireEvent.click(screen.getByText('OK'))
    expect(onSubmit).toHaveBeenCalledWith({ rows: 16, cells: 30, mines: 99 })
  })

  it('closes without submitting from Cancel and the title-bar close button', () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    render(<CustomField onSubmit={onSubmit} onClose={onClose} />)

    fireEvent.click(screen.getByText('Cancel'))
    fireEvent.click(screen.getByText('✕'))

    expect(onClose).toHaveBeenCalledTimes(2)
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
