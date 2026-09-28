export const mainNav = [
  { label: 'Domů', to: '/' },
  { label: 'Akce', to: '/events' },
  { label: 'Zápasníci', to: '/fighters' },
  { label: 'Žebříčky', to: '/rankings' },
  { label: 'Výsledky', to: '/results' },
  { label: 'Novinky', to: '/news' },
]

export const registerNav = { label: 'Registrace', to: '/register' }

export const legalNav = [
  { label: 'Podmínky', to: '/terms' },
  { label: 'Soukromí', to: '/privacy' },
]

export const footerNav = [
  ...mainNav.slice(1),
  { label: 'O nás', to: '/about' },
  registerNav,
]
