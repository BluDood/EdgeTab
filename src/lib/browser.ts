import type { Browser } from 'webextension-polyfill'

export async function getBrowser() {
  const browser = await import('webextension-polyfill')
  return browser.default
}

export let browser: Browser | null = null

try {
  browser = await getBrowser()
} catch {
  console.warn('Not running as an extension, extension API will not work')
}
