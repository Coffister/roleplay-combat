import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { brand } from '../config/brand'

type SeoProps = {
  /** Page name. Rendered as "CMRP Combat — {title}". Omit on the homepage. */
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
}

function upsert(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

/**
 * Sets title, description, canonical and OpenGraph/Twitter tags for the current page.
 * ponytail: client-side only. Discord/social previews need prerendered HTML; add a prerender step at build if link previews matter.
 */
export function Seo({ title, description = brand.description, image = brand.assets.ogImage, type = 'website' }: SeoProps) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = title ? `${brand.organization} — ${title}` : `${brand.organization} — ${brand.tagline}`
    const url = new URL(pathname, brand.siteUrl).href
    const img = new URL(image, brand.siteUrl).href
    document.title = fullTitle
    upsert('meta[name="description"]', { name: 'description', content: description })
    upsert('link[rel="canonical"]', { rel: 'canonical', href: url })
    upsert('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsert('meta[property="og:description"]', { property: 'og:description', content: description })
    upsert('meta[property="og:url"]', { property: 'og:url', content: url })
    upsert('meta[property="og:type"]', { property: 'og:type', content: type })
    upsert('meta[property="og:image"]', { property: 'og:image', content: img })
    upsert('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  }, [title, description, image, type, pathname])
  return null
}
