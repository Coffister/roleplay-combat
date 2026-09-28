import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { brand } from '../config/brand'
import { mainNav, registerNav } from '../config/navigation'
import { getNextEvent } from '../lib/queries'
import { eventTitle, formatDateShort } from '../lib/format'
import { LinkButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import s from './Header.module.css'

export function Logo() {
  return (
    <Link to="/" className={s.logo} aria-label={`${brand.organization} home`}>
      <img src={brand.assets.mark} alt="" width={32} height={32} />
      <span className={s.wordmark}>{brand.organization}</span>
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const next = getNextEvent()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={s.header}>
      <div className={s.bar}>
        <Logo />

        <nav aria-label="Main" className={s.desktopNav}>
          <ul>
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={s.navLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.right}>
          {next && (
            <Link to={`/events/${next.id}`} className={s.nextEvent}>
              <span className={s.pulse} aria-hidden />
              <span className="label">Next</span>
              <span className={s.nextName}>{eventTitle(next)}</span>
              <span className={s.nextDate}>{formatDateShort(next.date)}</span>
            </Link>
          )}
          {brand.social.discord && (
            <a href={brand.social.discord} className={s.discord} target="_blank" rel="noreferrer">
              Discord
            </a>
          )}
          <LinkButton to={registerNav.to} className={s.register}>{registerNav.label}</LinkButton>
          <button type="button" className={s.menuButton} onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <Menu aria-hidden />
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} label="Menu" variant="fullscreen">
        <div className={s.mobile}>
          <div className={s.mobileTop}>
            <Logo />
            <button type="button" className={s.menuButton} onClick={() => setOpen(false)} aria-label="Close menu">
              <X aria-hidden />
            </button>
          </div>
          <nav aria-label="Main" className={s.mobileNav}>
            <ol>
              {[...mainNav, registerNav].map((item, i) => (
                <li key={item.to} style={{ animationDelay: `${60 + i * 35}ms` }}>
                  <NavLink to={item.to} end={item.to === '/'} className={s.mobileLink}>
                    <span className={s.mobileIndex}>{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ol>
          </nav>
          {next && (
            <Link to={`/events/${next.id}`} className={s.mobileNext}>
              <span className="label">Next event</span>
              <span className={s.nextName}>{eventTitle(next)}</span>
              <span className="label">{formatDateShort(next.date)} · {next.location}</span>
            </Link>
          )}
        </div>
      </Modal>
    </header>
  )
}
