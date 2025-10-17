import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import zip from 'vite-plugin-zip-pack'
import { defineConfig } from 'vite'
import fs from 'fs/promises'

import generateManifest from './manifest.ts'

const pkg = JSON.parse(await fs.readFile('./package.json', 'utf-8'))

const browser = process.argv[4]
console.log(`Building for ${browser}`)

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest: generateManifest(pkg.version, browser) }),
    zip({
      outDir: 'release',
      outFileName: `${pkg.name}-${pkg.version}-${browser}.zip`
    })
  ],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//]
    }
  }
})
