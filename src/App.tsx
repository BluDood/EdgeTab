import { useEffect, useState, type KeyboardEvent } from 'react'
import AnimateHeight from 'react-animate-height'

import { getSuggestions, search } from './lib/search.ts'
import { getRandomVideo } from './lib/videos.ts'

import styles from './App.module.css'

export default function App() {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selected, setSelected] = useState(0)

  const [video, setVideo] = useState<{
    attribution: string
    image: string
    video: string
  } | null>(null)

  const [videoShown, setVideoShown] = useState(false)
  const [imageShown, setImageShown] = useState(false)
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)



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

  const [useStaticImage, setUseStaticImage] = useState(true)

  useEffect(() => {
    const prefersImage = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )
    setReducedMotion(prefersImage.matches)

    const width = window.innerWidth
    const closest = [240, 720, 1080, 1440, 2160].reduce((prev, curr) =>
      Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
    )

    getRandomVideo(closest, useStaticImage).then(setVideo)
  }, [useStaticImage])

  return (
    <div className={styles.app}>
      {video ? (
        <>
          {!reducedMotion && video.video ? (
            <video
              className={styles.background}
              src={video.video}
              data-shown={videoShown}
              onCanPlay={() => setVideoShown(true)}
              muted
              autoPlay
              loop
            />
          ) : null}
          <img
            className={styles.background}
            src={video.image}
            data-shown={imageShown}
            onLoad={() => setImageShown(true)}
            alt="background"
          />
        </>
      ) : null}

      <div className={styles.overlay}></div>


      <button
        className={styles.toggleButton}
        onClick={() => setUseStaticImage(prev => !prev)}
        >
        {useStaticImage ? 'Use Video Background' : 'Use Static Image'}
        </button>

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
          height={
            suggestions.length > 0 ? suggestions.length * 34 + 10 : 0
          }
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
    </div>
  )
}
