import React, { useContext, useEffect, useState } from 'react'

import { getRandomVideo } from '../../lib/videos.ts'

import { SettingsContext } from '../../contexts/SettingsContext.tsx'

import styles from './Background.module.css'

const Background: React.FC = () => {
  const { backgroundEffects, useStaticImage, customImage } =
    useContext(SettingsContext)

  const [video, setVideo] = useState<{
    attribution: string
    image: string
    video: string
  } | null>(null)

  const [videoShown, setVideoShown] = useState(false)
  const [imageShown, setImageShown] = useState(false)
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)

  useEffect(() => {
    if (useStaticImage) {
      setVideoShown(false)
      setTimeout(() => setVideo(null), 1000)
      return
    }

    const prefersImage = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(prefersImage.matches)

    const width = window.innerWidth
    const closest = [240, 720, 1080, 1440, 2160].reduce((prev, curr) =>
      Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
    )

    getRandomVideo(closest).then(setVideo)
  }, [useStaticImage])

  return (
    <>
      {!reducedMotion && video?.video ? (
        <video
          className={styles.background}
          src={video.video}
          data-shown={videoShown}
          onCanPlay={() => {
            setVideoShown(true)
            setImageShown(false)
          }}
          muted
          autoPlay
          loop
        />
      ) : null}
      <img
        className={styles.background}
        src={
          useStaticImage
            ? customImage ?? '/static/background.jpg'
            : video?.image
        }
        data-shown={imageShown}
        onLoad={() => setImageShown(true)}
        alt="background"
      />

      <div
        className={styles.overlay}
        style={{
          backgroundImage: `radial-gradient(circle, transparent ${
            100 - backgroundEffects.vignette
          }%, rgba(0, 0, 0, ${backgroundEffects.vignette / 100}) 100%)`,
          backdropFilter: `brightness(${backgroundEffects.brightness}%) saturate(${backgroundEffects.saturation}%)`,
          backgroundColor: `rgba(0, 0, 0, ${
            (100 - backgroundEffects.opacity) / 100
          })`
        }}
      ></div>
    </>
  )
}

export default Background
