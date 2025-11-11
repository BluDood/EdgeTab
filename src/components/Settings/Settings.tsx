import { useContext } from 'react'

import { SettingsContext } from '../../contexts/SettingsContext.tsx'

import styles from './Settings.module.css'

const Settings: React.FC = () => {
  const {
    customImage,
    useStaticImage,
    backgroundEffects,
    handleImageUpload,
    clearCustomImage,
    setUseStaticImage,
    updateEffect,
    resetEffects
  } = useContext(SettingsContext)

  return (
    <div className={styles.settings}>
      <button className={styles.opener}>
        <span className="material-symbols">settings</span>
      </button>
      <div className={styles.menu} tabIndex={-1}>
        <button
          className={styles.close}
          onClick={() =>
            document.activeElement instanceof HTMLElement &&
            document.activeElement.blur()
          }
        >
          <span className="material-symbols">close</span>
        </button>

        <div className={styles.section}>
          <h2>Background Mode</h2>
          <button
            className={styles.option}
            onClick={() => setUseStaticImage(!useStaticImage)}
          >
            <span className={styles.optionText}>
              {useStaticImage ? 'Use Video Background' : 'Use Static Image'}
            </span>
          </button>

          <label className={styles.option} htmlFor="imageUpload">
            <span className={styles.optionText}>Upload Custom Image</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />

          {customImage && (
            <button className={styles.option} onClick={clearCustomImage}>
              <span className={styles.optionText}>Clear Custom Image</span>
            </button>
          )}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.section}>
          <h2>Visual Effects</h2>

          <div className={styles.sliderContainer}>
            <div className={styles.sliderHeader}>
              <label className={styles.sliderLabel}>Brightness</label>
              <span className={styles.sliderValue}>
                {backgroundEffects.brightness}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={backgroundEffects.brightness}
              onChange={e => updateEffect('brightness', Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.sliderContainer}>
            <div className={styles.sliderHeader}>
              <label className={styles.sliderLabel}>Opacity</label>
              <span className={styles.sliderValue}>
                {backgroundEffects.opacity}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={backgroundEffects.opacity}
              onChange={e => updateEffect('opacity', Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.sliderContainer}>
            <div className={styles.sliderHeader}>
              <label className={styles.sliderLabel}>Vignette</label>
              <span className={styles.sliderValue}>
                {backgroundEffects.vignette}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={backgroundEffects.vignette}
              onChange={e => updateEffect('vignette', Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          <button className={styles.resetButton} onClick={resetEffects}>
            <span className="material-symbols">refresh</span>
            Reset Effects
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
