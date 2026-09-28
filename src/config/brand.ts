/**
 * The one file to edit when adapting this site to another server.
 * Colors and fonts are injected into index.html as CSS variables at build time
 * (see vite.config.ts), so components never reference raw values.
 */
export const brand = {
  name: 'CMRP',
  organization: 'CMRP Combat',
  tagline: 'Tady bojuje Los Santos.',
  description:
    'Oficiální bojová organizace roleplay serveru CMRP. Galavečery, zápasníci, žebříčky a výsledky.',
  parentProject: 'Projekt CMRP Roleplay',
  siteUrl: 'https://combat.cmrp.example',
  locale: 'cs-CZ',
  timeZone: 'Europe/Prague',

  colors: {
    bg: '#0b0b0c',
    surface: '#131315',
    surfaceElevated: '#1b1b1e',
    text: '#f1ede6',
    textMuted: '#9c978f',
    primary: '#e2352c',
    primaryContrast: '#ffffff',
    secondary: '#6f7680',
    accent: '#c9a24c',
    border: '#2a2a2e',
    win: '#4fae6a',
    loss: '#e2352c',
  },

  typography: {
    display: '"Big Shoulders Display", "Arial Narrow", sans-serif',
    body: 'Archivo, system-ui, sans-serif',
    stylesheet:
      'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Big+Shoulders+Display:wght@600;800;900&display=swap',
  },

  assets: {
    mark: '/assets/brand/mark.svg',
    favicon: '/assets/brand/favicon.svg',
    ogImage: '/assets/brand/og.svg',
  },

  social: {
    discord: 'https://discord.gg/your-invite',
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
    twitch: '',
  } as Record<string, string>,
}

export type Brand = typeof brand
