import type { CardType, Division, FightMethod } from '../types'

/** Divisions in display order. Rankings, filters and the registration form all read from here. */
export const divisions: Division[] = [
  { id: 'lightweight', name: 'Lightweight', limit: '155 lb' },
  { id: 'welterweight', name: 'Welterweight', limit: '170 lb' },
  { id: 'middleweight', name: 'Middleweight', limit: '185 lb' },
  { id: 'heavyweight', name: 'Heavyweight', limit: '265 lb' },
]

export const cardTypeLabels: Record<CardType, string> = {
  main: 'Main Event',
  'co-main': 'Co-Main Event',
  featured: 'Featured Bout',
  prelim: 'Preliminary',
}

/** Groups used by the fight card filter. A fight belongs to exactly one group. */
export const cardGroups: { id: string; label: string; types: CardType[] }[] = [
  { id: 'main', label: 'Main Card', types: ['main', 'co-main'] },
  { id: 'featured', label: 'Featured', types: ['featured'] },
  { id: 'prelim', label: 'Prelims', types: ['prelim'] },
]

export const methodLabels: Record<FightMethod, string> = {
  KO: 'KO',
  TKO: 'TKO',
  SUB: 'Submission',
  UD: 'Unanimous Decision',
  SD: 'Split Decision',
  MD: 'Majority Decision',
  DRAW: 'Draw',
  NC: 'No Contest',
  DQ: 'Disqualification',
}

export const fightingStyles = [
  'Boxing',
  'Kickboxing',
  'Muay Thai',
  'Brazilian Jiu-Jitsu',
  'Wrestling',
  'Judo',
  'Karate',
  'Sambo',
  'Street / Brawler',
  'Mixed',
]
