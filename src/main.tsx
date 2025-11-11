import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import App from './App.tsx'

import { SettingsContextProvider } from './contexts/SettingsContext.tsx'

import '@fontsource-variable/inter'
import '@fontsource-variable/material-symbols-outlined'
import './index.css'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  </StrictMode>
)
