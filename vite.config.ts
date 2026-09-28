import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { brand } from './src/config/brand'

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())

/** Writes brand config into index.html: tokens, fonts, title, favicon, default OG tags. */
function brandHtml(): Plugin {
  const vars = [
    ...Object.entries(brand.colors).map(([k, v]) => `--color-${kebab(k)}:${v}`),
    `--font-display:${brand.typography.display}`,
    `--font-body:${brand.typography.body}`,
  ].join(';')
  const og = new URL(brand.assets.ogImage, brand.siteUrl).href
  return {
    name: 'brand-html',
    transformIndexHtml: () => [
      { tag: 'style', attrs: { id: 'brand-tokens' }, children: `:root{${vars}}`, injectTo: 'head-prepend' },
      { tag: 'title', children: brand.organization },
      { tag: 'meta', attrs: { name: 'description', content: brand.description } },
      { tag: 'meta', attrs: { name: 'theme-color', content: brand.colors.bg } },
      { tag: 'meta', attrs: { property: 'og:site_name', content: brand.organization } },
      { tag: 'meta', attrs: { property: 'og:image', content: og } },
      { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: brand.assets.favicon } },
      { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
      { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
      { tag: 'link', attrs: { rel: 'stylesheet', href: brand.typography.stylesheet } },
    ],
  }
}

export default defineConfig({
  plugins: [react(), brandHtml()],
})
