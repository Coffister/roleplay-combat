export type DivisionId = string

export type Division = {
  id: DivisionId
  name: string
  limit: string
}

export type Fighter = {
  id: string
  firstName: string
  lastName: string
  nickname?: string
  /** Transparent cut-out portrait, subject facing right. Mirrored in CSS when on the B side. */
  portrait: string
  nationality?: string
  team?: string
  fightingStyle?: string
  divisionId: DivisionId
  /** Headline record. Source of truth, since it can include RP history from before this site. */
  record: { wins: number; losses: number; draws: number }
  winsByKO?: number
  winsBySubmission?: number
  winsByDecision?: number
  height?: string
  weight?: string
  reach?: string
  age?: number
  bio?: string
}

export type CardType = 'main' | 'co-main' | 'featured' | 'prelim'
export type Status = 'upcoming' | 'live' | 'completed'
export type FightMethod = 'KO' | 'TKO' | 'SUB' | 'UD' | 'SD' | 'MD' | 'DRAW' | 'NC' | 'DQ'

export type Fight = {
  id: string
  eventId: string
  /** 1 = main event, counting down the card. */
  order: number
  cardType: CardType
  fighterA: string
  fighterB: string
  divisionId: DivisionId
  scheduledRounds: 3 | 5
  titleFight?: boolean
  status: Status
  result?: {
    /** Omitted for draws and no contests. */
    winnerId?: string
    method: FightMethod
    detail?: string
    round?: number
    time?: string
  }
}

export type FightEvent = {
  id: string
  name: string
  number?: string
  /** ISO 8601 with offset. Drives the countdown. */
  date: string
  location: string
  venue?: string
  poster?: string
  status: Status
  broadcast?: string
  description?: string
}

export type RankingDivision = {
  divisionId: DivisionId
  updatedAt: string
  championId?: string
  entries: { fighterId: string; position: number; previousPosition?: number }[]
}

export type NewsCategory = 'announcement' | 'fight-night' | 'roster' | 'results'

export type NewsBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type NewsArticle = {
  slug: string
  title: string
  category: NewsCategory
  date: string
  image: string
  imageAlt: string
  excerpt: string
  author?: string
  body: NewsBlock[]
}

export type RegistrationInput = {
  characterName: string
  nickname: string
  discord: string
  age: string
  nationality: string
  divisionId: DivisionId
  height: string
  fightingStyle: string
  team: string
  experience: string
  bio: string
  profileImage: File | null
  socialLinks: string
  notes: string
  agreeRules: boolean
}
