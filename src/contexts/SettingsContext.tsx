import { createContext, useEffect, useState } from 'react'

interface BackgroundEffects {
  brightness: number
  saturation: number
  opacity: number
  vignette: number
}

interface SettingsContextProps {
  customImage: string | null
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearCustomImage: () => void

  useStaticImage: boolean
  setUseStaticImage: (value: boolean) => void

  backgroundEffects: BackgroundEffects
  updateEffect: (key: keyof BackgroundEffects, value: number) => void
  resetEffects: () => void
}

const SettingsContext = createContext<SettingsContextProps>({
  customImage: null,
  handleImageUpload: () => {},
  clearCustomImage: () => {},

  useStaticImage: false,
  setUseStaticImage: () => {},

  backgroundEffects: {
    brightness: 100,
    saturation: 100,
    opacity: 100,
    vignette: 0
  },
  updateEffect: () => {},
  resetEffects: () => {}
})

interface SettingsContextProviderProps {
  children: React.ReactNode
}

const SettingsContextProvider = ({
  children
}: SettingsContextProviderProps) => {
  const [customImage, setCustomImage] = useState<string | null>(
    localStorage.getItem('customBackgroundImage')
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = event => {
        const imageUrl = event.target?.result as string
        setCustomImage(imageUrl)
        localStorage.setItem('customBackgroundImage', imageUrl)
        setUseStaticImage(true)
        localStorage.setItem('useStaticImage', 'true')
      }
      reader.readAsDataURL(file)
    }
  }

  const clearCustomImage = () => {
    setCustomImage(null)
    localStorage.removeItem('customBackgroundImage')
  }

  const [useStaticImage, setUseStaticImage] = useState(() => {
    const saved = localStorage.getItem('useStaticImage')
    return saved ? saved === 'true' : false
  })

  useEffect(() => {
    localStorage.setItem('useStaticImage', useStaticImage.toString())
  }, [useStaticImage])

  const [backgroundEffects, setBackgroundEffects] = useState<BackgroundEffects>(
    () => {
      const saved = localStorage.getItem('backgroundEffects')
      return saved
        ? JSON.parse(saved)
        : {
            brightness: 100,
            saturation: 100,
            opacity: 100,
            vignette: 0
          }
    }
  )

  const updateEffect = (key: keyof BackgroundEffects, value: number) => {
    setBackgroundEffects(prev => ({ ...prev, [key]: value }))
  }

  const resetEffects = () => {
    setBackgroundEffects({
      brightness: 100,
      saturation: 100,
      opacity: 100,
      vignette: 0
    })
  }

  useEffect(() => {
    localStorage.setItem('backgroundEffects', JSON.stringify(backgroundEffects))
  }, [backgroundEffects])

  return (
    <SettingsContext.Provider
      value={{
        customImage,
        handleImageUpload,
        clearCustomImage,
        useStaticImage,
        setUseStaticImage,
        backgroundEffects,
        updateEffect,
        resetEffects
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsContextProvider }
