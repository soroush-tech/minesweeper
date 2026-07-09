import { screen } from '@testing-library/react'

import App from './App'
import { renderWithProvider } from './renderWithProvider.tsx'

describe('App', () => {
  it('renders headline', () => {
    renderWithProvider(App)

    screen.debug()

    // check if App components renders headline
  })
})
