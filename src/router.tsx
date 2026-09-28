import { createBrowserRouter } from 'react-router'
import { PageLoading, RootLayout } from './layouts/RootLayout'
import { ErrorPage } from './pages/ErrorPage'

/** Each page is its own chunk. Pages default-export their component. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    HydrateFallback: PageLoading,
    children: [
      { index: true, lazy: page(() => import('./pages/HomePage')) },
      { path: 'events', lazy: page(() => import('./pages/EventsPage')) },
      { path: 'events/:eventId', lazy: page(() => import('./pages/EventDetailPage')) },
      { path: 'fighters', lazy: page(() => import('./pages/FightersPage')) },
      { path: 'fighters/:fighterId', lazy: page(() => import('./pages/FighterDetailPage')) },
      { path: 'rankings', lazy: page(() => import('./pages/RankingsPage')) },
      { path: 'results', lazy: page(() => import('./pages/ResultsPage')) },
      { path: 'news', lazy: page(() => import('./pages/NewsPage')) },
      { path: 'news/:slug', lazy: page(() => import('./pages/ArticlePage')) },
      { path: 'register', lazy: page(() => import('./pages/RegisterPage')) },
      { path: 'about', lazy: page(() => import('./pages/AboutPage')) },
      { path: 'terms', lazy: page(() => import('./pages/LegalPage')) },
      { path: 'privacy', lazy: page(() => import('./pages/LegalPage')) },
      { path: '*', Component: () => <ErrorPage notFound /> },
    ],
  },
])
