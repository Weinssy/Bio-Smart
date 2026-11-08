import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import './styles/design-tokens.css'
import './styles/dashboard.css'
import './styles/materi.css'
import './App.css'
import './styles/learning.css'

export default function App() {
  return (
    <ThemeProvider>
        <HashRouter>
          <a href="#main-content" className="skip-link" onClick={event => { event.preventDefault(); const main = document.querySelector('main'); main?.focus(); main?.scrollIntoView(); }}>Lewati ke isi utama</a>
          <AppRoutes />
        </HashRouter>
    </ThemeProvider>
  )
}
