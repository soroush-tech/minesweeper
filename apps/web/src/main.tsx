import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { renderWithProvider } from './renderWithProvider.tsx'
import './index.css'

const render = () =>
  ReactDOM.createRoot(document.getElementById('root')!).render(renderWithProvider(App))

// MSW is the backend in every environment — the handlers run the game against
// IndexedDB. Render only once the worker is in control, otherwise the first
// board request escapes to the network and the origin answers 404. Render
// anyway if it fails, so a broken worker shows the app rather than a blank page.
import('./service/mocks/runtime')
  .then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
  .catch((error: Error) => console.error('msw worker error', error))
  .finally(render)
