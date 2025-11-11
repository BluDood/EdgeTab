import React from 'react'

import styles from './App.module.css'

import Settings from './components/Settings/Settings.tsx'
import Search from './components/Search/Search.tsx'
import Background from './components/Background/Background.tsx'

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Background />
      <Search />
      <Settings />
    </div>
  )
}

export default App
