import axios from 'axios'

import { browser } from './browser.ts'

export async function getSuggestions(query: string) {
  const res = await axios
    .get('https://google.com/complete/search', {
      params: { q: query, client: 'chrome' },
      withCredentials: false,
      validateStatus: () => true
    })
    .catch(() => null)
  if (!res || res.status !== 200) return []

  return res.data[1] as string[]
}

export async function search(query: string) {
  if (!browser)
    return window.open(
      `https://google.com/search?q=${encodeURIComponent(query)}`,
      '_blank'
    )

  await browser.search.query({ text: query })
}
