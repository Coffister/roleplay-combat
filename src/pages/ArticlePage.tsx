import { Link, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Seo } from '../lib/seo'
import { getArticle, getNews } from '../lib/queries'
import { formatDateLong } from '../lib/format'
import { ArticleBody, NewsCard, categoryLabels } from '../components/news'
import { Container, Section, SectionHeader } from '../components/ui/Layout'
import { ErrorPage } from './ErrorPage'
import s from './pages.module.css'

export default function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  if (!article) return <ErrorPage notFound />
  const more = getNews().filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <>
      <Seo title={article.title} description={article.excerpt} image={article.image} type="article" />
      <article>
        <header className={s.articleHeader}>
          <Container className={s.articleHead}>
            <Link to="/news" className={s.back}><ArrowLeft size={16} aria-hidden /> Všechny novinky</Link>
            <p className={s.articleMeta}>
              <span className={s.category}>{categoryLabels[article.category]}</span>
              <time dateTime={article.date}>{formatDateLong(article.date)}</time>
              {article.author && <span>Autor: {article.author}</span>}
            </p>
            <h1 className={s.articleTitle}>{article.title}</h1>
            <p className={s.standfirst}>{article.excerpt}</p>
          </Container>
        </header>
        <Container>
          <img src={article.image} alt={article.imageAlt} className={s.articleImage} fetchPriority="high" />
          <div className={s.articleBody}>
            <ArticleBody blocks={article.body} />
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <Section tone="surface" aria-labelledby="more-news">
          <SectionHeader eyebrow="Čti dál" title="Další novinky" id="more-news" action={{ label: 'Všechny novinky', to: '/news' }} />
          <ul className={s.grid2}>
            {more.map((a) => <li key={a.slug}><NewsCard article={a} /></li>)}
          </ul>
        </Section>
      )}
    </>
  )
}
