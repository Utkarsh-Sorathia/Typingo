import ReactDOM from 'react-dom/client'
import './index.css' // includes Tailwind directives
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <GoogleAnalytics />
    <App />
  </BrowserRouter>,
)
