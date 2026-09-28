import { Link } from 'react-router'
import { brand } from '../config/brand'
import { footerNav, legalNav } from '../config/navigation'
import { Container } from '../components/ui/Layout'
import { Logo } from './Header'
import s from './Footer.module.css'

const socialLabels: Record<string, string> = { discord: 'Discord', instagram: 'Instagram', tiktok: 'TikTok', twitch: 'Twitch', youtube: 'YouTube', x: 'X' }

export function Footer() {
  const socials = Object.entries(brand.social).filter(([, url]) => url)
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.top}>
          <div className={s.brand}>
            <Logo />
            <p className={s.tagline}>{brand.tagline}</p>
          </div>
          <nav aria-label="Footer" className={s.col}>
            <h2 className="label">Navigate</h2>
            <ul>
              {footerNav.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          {socials.length > 0 && (
            <div className={s.col}>
              <h2 className="label">Follow</h2>
              <ul>
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noreferrer">{socialLabels[key] ?? key} <span aria-hidden>↗</span></a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={s.bottom}>
          <p className={s.project}>{brand.parentProject}</p>
          <p className="label">
            © {new Date().getFullYear()} {brand.organization}. A fictional organisation within a roleplay server.
          </p>
          <ul className={s.legal}>
            {legalNav.map((l) => (
              <li key={l.to}><Link to={l.to} className="label">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
