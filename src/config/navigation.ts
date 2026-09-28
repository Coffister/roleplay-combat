export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Fighters', to: '/fighters' },
  { label: 'Rankings', to: '/rankings' },
  { label: 'Results', to: '/results' },
  { label: 'News', to: '/news' },
]

export const registerNav = { label: 'Register', to: '/register' }

export const legalNav = [
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
]

export const footerNav = [
  ...mainNav.slice(1),
  { label: 'About', to: '/about' },
  registerNav,
]
