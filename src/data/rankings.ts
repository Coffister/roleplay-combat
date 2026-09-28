import type { RankingDivision } from '../types'

export const rankings: RankingDivision[] = [
  {
    divisionId: 'lightweight', updatedAt: '2026-08-25', championId: 'marcus-vega',
    entries: [
      { fighterId: 'dante-okafor', position: 1, previousPosition: 2 },
      { fighterId: 'luka-petrovic', position: 2, previousPosition: 1 },
      { fighterId: 'kenji-arai', position: 3, previousPosition: 3 },
      { fighterId: 'jaylen-brooks', position: 4, previousPosition: 4 },
    ],
  },
  {
    divisionId: 'welterweight', updatedAt: '2026-08-25', championId: 'tomas-rivera',
    entries: [
      { fighterId: 'noah-van-dijk', position: 1, previousPosition: 3 },
      { fighterId: 'rashid-karimov', position: 2, previousPosition: 4 },
      { fighterId: 'andre-silva', position: 3, previousPosition: 1 },
      { fighterId: 'cole-mercer', position: 4, previousPosition: 2 },
    ],
  },
  {
    divisionId: 'middleweight', updatedAt: '2026-08-25', championId: 'viktor-hale',
    entries: [
      { fighterId: 'mateo-cruz', position: 1, previousPosition: 1 },
      { fighterId: 'emre-yildiz', position: 2 },
      { fighterId: 'malik-grant', position: 3, previousPosition: 2 },
      { fighterId: 'sam-kowalski', position: 4, previousPosition: 3 },
    ],
  },
  {
    divisionId: 'heavyweight', updatedAt: '2026-08-25', championId: 'oleksandr-bondar',
    entries: [
      { fighterId: 'lars-eriksen', position: 1, previousPosition: 1 },
      { fighterId: 'jerome-wallace', position: 2, previousPosition: 3 },
      { fighterId: 'tane-rawiri', position: 3, previousPosition: 2 },
      { fighterId: 'deshawn-price', position: 4, previousPosition: 4 },
    ],
  },
]
