import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Clock from './clock'
 
describe('Clock', () => {
  it('check if clock is rendering', () => {
    render(<Clock />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})