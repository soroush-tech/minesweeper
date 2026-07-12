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
    fireEvent.change(inputs[1], { target: { value: '20' } })
    fireEvent.change(inputs[2], { target: { value: '40' } })

    fireEvent.click(screen.getByText('OK'))
    expect(onSubmit).toHaveBeenCalledWith({ rows: 16, cells: 20, mines: 40 })
  })

  it('clamps oversized values: height to 30, width to 24, mines to width*height-1', () => {
    const onSubmit = vi.fn()
    render(<CustomField onSubmit={onSubmit} onClose={vi.fn()} />)
    const inputs = document.querySelectorAll<HTMLInputElement>('.customFieldRow input')
    fireEvent.change(inputs[0], { target: { value: '999' } }) // height -> 30
    fireEvent.change(inputs[1], { target: { value: '999' } }) // width -> 24
    fireEvent.change(inputs[2], { target: { value: '99999' } }) // mines -> 30*24-1

    fireEvent.click(screen.getByText('OK'))
    expect(onSubmit).toHaveBeenCalledWith({ rows: 30, cells: 24, mines: 30 * 24 - 1 })
  })

  it('raises fewer than 10 mines up to the minimum of 10', () => {
    const onSubmit = vi.fn()
    render(<CustomField onSubmit={onSubmit} onClose={vi.fn()} />)
    const inputs = document.querySelectorAll<HTMLInputElement>('.customFieldRow input')
    fireEvent.change(inputs[2], { target: { value: '3' } }) // mines -> 10

    fireEvent.click(screen.getByText('OK'))
    expect(onSubmit).toHaveBeenCalledWith({ rows: 8, cells: 8, mines: 10 })
  })

  it('closes without submitting from Cancel and the title-bar close button', () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    render(<CustomField onSubmit={onSubmit} onClose={onClose} />)

    fireEvent.click(screen.getByText('Cancel'))
    fireEvent.click(screen.getByAltText('close'))

    expect(onClose).toHaveBeenCalledTimes(2)
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
