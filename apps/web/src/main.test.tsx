const mocks = vi.hoisted(() => ({
  start: vi.fn(),
  createRoot: vi.fn(),
  render: vi.fn(),
}))

vi.mock('react-dom/client', () => ({ default: { createRoot: mocks.createRoot } }))
vi.mock('./service/mocks/runtime', () => ({ worker: { start: mocks.start } }))

describe('main', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    mocks.createRoot.mockReturnValue({ render: mocks.render })
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('renders only once the mock worker is in control', async () => {
    let activateWorker = () => {}
    mocks.start.mockReturnValue(
      new Promise<void>((resolve) => {
        activateWorker = resolve
      }),
    )

    await import('./main.tsx')
    // Rendering here would let the first board request escape to the network.
    expect(mocks.render).not.toHaveBeenCalled()

    activateWorker()
    await vi.waitFor(() => expect(mocks.render).toHaveBeenCalledTimes(1))
  })

  it('renders anyway when the worker fails to start', async () => {
    const error = new Error('registration failed')
    mocks.start.mockRejectedValue(error)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    await import('./main.tsx')

    await vi.waitFor(() => expect(mocks.render).toHaveBeenCalledTimes(1))
    expect(consoleError).toHaveBeenCalledWith('msw worker error', error)
    consoleError.mockRestore()
  })
})
