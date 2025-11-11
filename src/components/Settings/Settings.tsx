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
      <button
        className={styles.opener}
        onMouseDown={e =>
          document.activeElement === e.currentTarget &&
          setTimeout(() => (document.activeElement as HTMLElement).blur(), 1)
        }
      >
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
          <h2>Background</h2>
          <div className={styles.switch}>
            <button
              className={styles.option}
              data-active={!useStaticImage}
              onClick={() => setUseStaticImage(false)}
            >
              Video
            </button>
            <button
              className={styles.option}
              data-active={useStaticImage}
              onClick={() => setUseStaticImage(true)}
            >
              Static Image
            </button>
          </div>
          {useStaticImage && (
            <div className={styles.buttons}>
              <button className={styles.button}>
                <span className="material-symbols">file_upload</span>
                Upload Custom Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </button>

              {customImage && (
                <button
                  className={styles.button}
                  onClick={clearCustomImage}
                  data-color="red"
                >
                  <span className="material-symbols">delete</span>
                </button>
              )}
            </div>
          )}
        </div>

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
          <div className={styles.buttons}>
            <button
              className={[styles.button, styles.resetButton].join(' ')}
              onClick={resetEffects}
            >
              <span className="material-symbols">refresh</span>
              Reset Effects
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
