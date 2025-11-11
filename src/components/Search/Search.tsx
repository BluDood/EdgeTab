import React, { useState, type KeyboardEvent } from 'react'
import AnimateHeight from 'react-animate-height'

import { getSuggestions, search } from '../../lib/search.ts'

import styles from './Search.module.css'

const Search: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selected, setSelected] = useState(0)
  async function updateSuggestions(query: string) {
    const suggestions = await getSuggestions(query)
    setSuggestions([query, ...suggestions.slice(0, 5)])
    setSelected(0)
  }

  async function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length > 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        return await search(suggestions[selected])
      } else if (e.key === 'Tab') {
        e.preventDefault()
        if (e.shiftKey) {
          return setSelected(
            p => (p - 1 + suggestions.length) % suggestions.length
          )
        }
        return setSelected(p => (p + 1) % suggestions.length)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        return setSelected(p => (p + 1) % suggestions.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        return setSelected(
          p => (p - 1 + suggestions.length) % suggestions.length
        )
      } else if (e.key === 'Escape') {
        return setSuggestions([])
      }
    }

    setTimeout(async () => {
      const target = e.target as HTMLInputElement

      if (target.value === '') return setSuggestions([])
      if (e.key.match(/^[a-zA-Z0-9]$/) || e.key === 'Backspace')
        await updateSuggestions(target.value)
    }, 0)
  }
  return (
    <div className={styles.search}>
      <div className={styles.box}>
        <span className="material-symbols">search</span>
        <input
          className={styles.input}
          type="text"
          placeholder="Search..."
          onKeyDown={onKeyDown}
        />
      </div>
      <AnimateHeight
        className={styles.suggestions}
        height={suggestions.length > 0 ? suggestions.length * 34 + 10 : 0}
        duration={200}
      >
        {suggestions.map((s, i) => (
          <button
            className={styles.suggestion}
            key={i}
            data-active={selected === i}
            onClick={() => search(s)}
          >
            <span className="material-symbols">search</span>
            <p>{s}</p>
          </button>
        ))}
      </AnimateHeight>
    </div>
  )
}

export default Search
