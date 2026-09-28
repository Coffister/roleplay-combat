import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import s from './effects.module.css'

/** Soft cone of light falling from above. Adapted from Aceternity "Spotlight". Hero only. */
export function Spotlight({ className }: { className?: string }) {
  return <div aria-hidden className={[s.spotlight, className].filter(Boolean).join(' ')} />
}

/** Fade-up once when scrolled into view. MotionConfig reducedMotion="user" disables the movement. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
