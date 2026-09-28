import type { Fight } from '../types'

export const fights: Fight[] = [
  // Origins
  { id: 'or-1', eventId: 'origins', order: 1, cardType: 'main', fighterA: 'tomas-rivera', fighterB: 'cole-mercer', divisionId: 'welterweight', scheduledRounds: 5, titleFight: true, status: 'completed',
    result: { winnerId: 'tomas-rivera', method: 'KO', detail: 'Right hand', round: 1, time: '2:14' } },
  { id: 'or-2', eventId: 'origins', order: 2, cardType: 'co-main', fighterA: 'viktor-hale', fighterB: 'sam-kowalski', divisionId: 'middleweight', scheduledRounds: 3, status: 'completed',
    result: { winnerId: 'viktor-hale', method: 'SUB', detail: 'Rear-naked choke', round: 2, time: '3:40' } },
  { id: 'or-3', eventId: 'origins', order: 3, cardType: 'featured', fighterA: 'oleksandr-bondar', fighterB: 'deshawn-price', divisionId: 'heavyweight', scheduledRounds: 3, status: 'completed',
    result: { winnerId: 'oleksandr-bondar', method: 'TKO', detail: 'Punches', round: 2, time: '1:02' } },
  { id: 'or-4', eventId: 'origins', order: 4, cardType: 'prelim', fighterA: 'dante-okafor', fighterB: 'jaylen-brooks', divisionId: 'lightweight', scheduledRounds: 3, status: 'completed',
    result: { winnerId: 'dante-okafor', method: 'UD', round: 3, time: '5:00' } },

  // Fight Night 00
  { id: 'fn00-1', eventId: 'fight-night-00', order: 1, cardType: 'main', fighterA: 'marcus-vega', fighterB: 'luka-petrovic', divisionId: 'lightweight', scheduledRounds: 5, titleFight: true, status: 'completed',
    result: { winnerId: 'marcus-vega', method: 'TKO', detail: 'Punches', round: 4, time: '3:21' } },
  { id: 'fn00-2', eventId: 'fight-night-00', order: 2, cardType: 'co-main', fighterA: 'viktor-hale', fighterB: 'mateo-cruz', divisionId: 'middleweight', scheduledRounds: 5, titleFight: true, status: 'completed',
    result: { winnerId: 'viktor-hale', method: 'UD', round: 5, time: '5:00' } },
  { id: 'fn00-3', eventId: 'fight-night-00', order: 3, cardType: 'featured', fighterA: 'noah-van-dijk', fighterB: 'andre-silva', divisionId: 'welterweight', scheduledRounds: 3, status: 'completed',
    result: { winnerId: 'noah-van-dijk', method: 'KO', detail: 'Head kick', round: 2, time: '0:47' } },
  { id: 'fn00-4', eventId: 'fight-night-00', order: 4, cardType: 'featured', fighterA: 'jerome-wallace', fighterB: 'lars-eriksen', divisionId: 'heavyweight', scheduledRounds: 3, status: 'completed',
    result: { winnerId: 'jerome-wallace', method: 'SD', round: 3, time: '5:00' } },
  { id: 'fn00-5', eventId: 'fight-night-00', order: 5, cardType: 'prelim', fighterA: 'rashid-karimov', fighterB: 'cole-mercer', divisionId: 'welterweight', scheduledRounds: 3, status: 'completed',
    result: { winnerId: 'rashid-karimov', method: 'SUB', detail: 'Arm-triangle choke', round: 1, time: '4:12' } },
  { id: 'fn00-6', eventId: 'fight-night-00', order: 6, cardType: 'prelim', fighterA: 'kenji-arai', fighterB: 'jaylen-brooks', divisionId: 'lightweight', scheduledRounds: 3, status: 'completed',
    result: { method: 'DRAW', detail: 'Majority draw', round: 3, time: '5:00' } },
  { id: 'fn00-7', eventId: 'fight-night-00', order: 7, cardType: 'prelim', fighterA: 'emre-yildiz', fighterB: 'sam-kowalski', divisionId: 'middleweight', scheduledRounds: 3, status: 'completed',
    result: { winnerId: 'emre-yildiz', method: 'KO', detail: 'Knee', round: 1, time: '1:58' } },

  // Fight Night 01
  { id: 'fn01-1', eventId: 'fight-night-01', order: 1, cardType: 'main', fighterA: 'marcus-vega', fighterB: 'dante-okafor', divisionId: 'lightweight', scheduledRounds: 5, titleFight: true, status: 'upcoming' },
  { id: 'fn01-2', eventId: 'fight-night-01', order: 2, cardType: 'co-main', fighterA: 'noah-van-dijk', fighterB: 'rashid-karimov', divisionId: 'welterweight', scheduledRounds: 3, status: 'upcoming' },
  { id: 'fn01-3', eventId: 'fight-night-01', order: 3, cardType: 'featured', fighterA: 'jerome-wallace', fighterB: 'tane-rawiri', divisionId: 'heavyweight', scheduledRounds: 3, status: 'upcoming' },
  { id: 'fn01-4', eventId: 'fight-night-01', order: 4, cardType: 'featured', fighterA: 'emre-yildiz', fighterB: 'mateo-cruz', divisionId: 'middleweight', scheduledRounds: 3, status: 'upcoming' },
  { id: 'fn01-5', eventId: 'fight-night-01', order: 5, cardType: 'prelim', fighterA: 'malik-grant', fighterB: 'sam-kowalski', divisionId: 'middleweight', scheduledRounds: 3, status: 'upcoming' },
  { id: 'fn01-6', eventId: 'fight-night-01', order: 6, cardType: 'prelim', fighterA: 'kenji-arai', fighterB: 'jaylen-brooks', divisionId: 'lightweight', scheduledRounds: 3, status: 'upcoming' },
  { id: 'fn01-7', eventId: 'fight-night-01', order: 7, cardType: 'prelim', fighterA: 'cole-mercer', fighterB: 'andre-silva', divisionId: 'welterweight', scheduledRounds: 3, status: 'upcoming' },

  // Fight Night 02
  { id: 'fn02-1', eventId: 'fight-night-02', order: 1, cardType: 'main', fighterA: 'oleksandr-bondar', fighterB: 'lars-eriksen', divisionId: 'heavyweight', scheduledRounds: 5, titleFight: true, status: 'upcoming' },
  { id: 'fn02-2', eventId: 'fight-night-02', order: 2, cardType: 'co-main', fighterA: 'tomas-rivera', fighterB: 'luka-petrovic', divisionId: 'welterweight', scheduledRounds: 5, titleFight: true, status: 'upcoming' },
]
