import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { renderWithProvider } from './renderWithProvider.tsx'
import './index.css'

// if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_MSW) {
import('./service/mocks/runtime')
  .then(({ worker }) => {
    console.log('development', worker)
    return worker.start({ onUnhandledRequest: 'bypass' })
  })
  .catch((error: Error) => console.log('msw worker error', error))
// }

ReactDOM.createRoot(document.getElementById('root')!).render(renderWithProvider(App))
