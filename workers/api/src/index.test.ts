import { describe, expect, it } from 'vitest'
import { handler } from './index'

describe('handler', () => {
  it('returns a 200 JSON response', async () => {
    const result = await handler()

    expect(result.statusCode).toBe(200)
    expect(result.headers['content-type']).toBe('application/json')
    expect(JSON.parse(result.body)).toEqual({ message: 'minesweeper api: ok' })
  })
})
