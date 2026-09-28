import { Link } from 'react-router'
import type { NewsArticle, NewsBlock, NewsCategory } from '../../types'
import { formatDateLong } from '../../lib/format'
import s from './news.module.css'

export const categoryLabels: Record<NewsCategory, string> = {
  announcement: 'Oznámení',
  'fight-night': 'Galavečer',
  roster: 'Soupiska',
  results: 'Výsledky',
}

export function NewsCard({ article, variant = 'default' }: { article: NewsArticle; variant?: 'default' | 'lead' }) {
  return (
    <article className={`${s.card} ${s[variant]}`}>
      <div className={s.media}>
        <img src={article.image} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={s.body}>
        <p className={s.meta}>
          <span className={s.category}>{categoryLabels[article.category]}</span>
          <time dateTime={article.date}>{formatDateLong(article.date)}</time>
        </p>
        <h3 className={s.title}>
          <Link to={`/news/${article.slug}`} className={s.stretched}>{article.title}</Link>
        </h3>
        <p className={s.excerpt}>{article.excerpt}</p>
      </div>
    </article>
  )
}

/** Renders structured article content. */
export function ArticleBody({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div className={s.article}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i}>{b.text}</p>
          case 'h2':
            return <h2 key={i}>{b.text}</h2>
          case 'quote':
            return (
              <figure key={i} className={s.quote}>
                <blockquote>{b.text}</blockquote>
                {b.cite && <figcaption>{b.cite}</figcaption>}
              </figure>
            )
          case 'image':
            return (
              <figure key={i} className={s.figure}>
                <img src={b.src} alt={b.alt} loading="lazy" />
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            )
        }
      })}
    </div>
  )
}
