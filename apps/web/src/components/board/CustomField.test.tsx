import { render, screen, fireEvent } from '@testing-library/react'
import { CustomField } from './CustomField'

describe('CustomField', () => {
  it('renders the Height, Width and Mines fields with defaults', () => {
    render(<CustomField onClose={vi.fn()} />)
    expect(screen.getByText('Height:')).toBeInTheDocument()
    expect(screen.getByText('Width:')).toBeInTheDocument()
    expect(screen.getByText('Mines:')).toBeInTheDocument()

    const inputs = document.querySelectorAll<HTMLInputElement>('.customFieldRow input')
    const values = Array.from(inputs).map((input) => input.value)
    expect(values).toEqual(['8', '8', '10'])
  })

  it('updates each field when edited', () => {
    render(<CustomField onClose={vi.fn()} />)
    const inputs = document.querySelectorAll<HTMLInputElement>('.customFieldRow input')
    fireEvent.change(inputs[0], { target: { value: '16' } })
    fireEvent.change(inputs[1], { target: { value: '30' } })
    fireEvent.change(inputs[2], { target: { value: '99' } })
    expect(Array.from(inputs).map((input) => input.value)).toEqual(['16', '30', '99'])
  })

  it('calls onClose from OK, Cancel and the title-bar close button', () => {
    const onClose = vi.fn()
    render(<CustomField onClose={onClose} />)

    fireEvent.click(screen.getByText('OK'))
    fireEvent.click(screen.getByText('Cancel'))
    fireEvent.click(screen.getByText('✕'))

    expect(onClose).toHaveBeenCalledTimes(3)
  })
})
