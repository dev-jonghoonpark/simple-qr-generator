import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { detectLocale } from './i18n'
import './index.css'
import App from './App.tsx'

document.documentElement.lang = detectLocale() === 'ko' ? 'ko' : 'en';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
