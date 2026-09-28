import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router'
import { MotionConfig, motion } from 'motion/react'
import { Header } from './Header'
import { Footer } from './Footer'

export function RootLayout() {
  const { pathname } = useLocation()
  const loading = useNavigation().state === 'loading'
  return (
    <MotionConfig reducedMotion="user">
      {loading && <div className="route-progress" role="progressbar" aria-label="Loading page" />}
      <a href="#main" className="skip-link">Skip to content</a>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <Header />
        <motion.main
          id="main"
          tabIndex={-1}
          style={{ outline: "none" }}
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Outlet />
        </motion.main>
        <Footer />
      </div>
      <ScrollRestoration />
    </MotionConfig>
  )
}

/** Shown while the first route chunk loads. */
export function PageLoading() {
  return <div className="route-progress" role="progressbar" aria-label="Loading" />
}
