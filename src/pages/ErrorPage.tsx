import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Seo } from '../lib/seo'
import { LinkButton } from '../components/ui/Button'
import { Container } from '../components/ui/Layout'
import s from './pages.module.css'

/** 404 and route errors. Also used directly by pages when a record isn't found. */
export function ErrorPage({ notFound }: { notFound?: boolean }) {
  const error = useRouteError()
  const is404 = notFound || (isRouteErrorResponse(error) && error.status === 404)
  if (error && !is404) console.error(error)

  return (
    <Container className={s.error}>
      <Seo title={is404 ? 'Not found' : 'Error'} />
      <p className={s.errorCode} aria-hidden>{is404 ? '404' : 'KO'}</p>
      <h1 className={s.errorTitle}>{is404 ? 'Nothing in this corner' : 'Something went wrong'}</h1>
      <p className={s.errorText}>
        {is404 ? "The page you're looking for doesn't exist or has moved." : 'Try reloading the page. If it keeps happening, let us know on Discord.'}
      </p>
      <LinkButton to="/" variant="outline">Back to home</LinkButton>
    </Container>
  )
}
