import { defineManifest } from '@crxjs/vite-plugin'

export default function generateManifest(
  version: string,
  browser: string
) {
  return defineManifest({
    manifest_version: 3,
    name: 'EdgeTab',
    version,
    description:
      'A fresh, modern and minimal new tab page for your browser.',
    chrome_url_overrides: {
      newtab: 'index.html'
    },
    permissions: ['search'],
    host_permissions: ['https://assets.msn.com/', 'https://google.com/'],
    icons: {
      '16': 'icons/16.png',
      '32': 'icons/32.png',
      '48': 'icons/48.png',
      '128': 'icons/128.png'
    },
    ...(browser === 'firefox'
      ? {
          chrome_settings_overrides: {
            homepage: 'index.html'
          },
          browser_specific_settings: {
            gecko: {
              id: 'edgetab@bludood.com'
            }
          }
        }
      : {})
  })
}
