import type { Fighter } from '../types'

const portrait = (id: string) => `/assets/fighters/${id}.svg`

export const fighters: Fighter[] = [
  // Lightweight
  {
    id: 'marcus-vega', firstName: 'Marcus', lastName: 'Vega', nickname: 'The Wolf', portrait: portrait('marcus-vega'),
    nationality: 'Mexico', team: 'Vespucci MMA', fightingStyle: 'Boxing', divisionId: 'lightweight',
    record: { wins: 12, losses: 2, draws: 0 }, winsByKO: 7, winsBySubmission: 2, winsByDecision: 3,
    height: "5'10\"", weight: '155 lb', reach: '72"', age: 29,
    bio: 'Came up through the underground circuit in Cypress Flats before CMRP Combat existed. Vega fights behind a high guard and a patient jab, then ends things fast when he sees an opening. Undefeated since the promotion launched.',
  },
  {
    id: 'dante-okafor', firstName: 'Dante', lastName: 'Okafor', nickname: 'Bull', portrait: portrait('dante-okafor'),
    nationality: 'Nigeria', team: 'Strawberry Boxing Club', fightingStyle: 'Kickboxing', divisionId: 'lightweight',
    record: { wins: 10, losses: 3, draws: 0 }, winsByKO: 6, winsBySubmission: 0, winsByDecision: 4,
    height: "5'9\"", weight: '155 lb', reach: '71"', age: 27,
    bio: 'Forward pressure, heavy low kicks and a chin that has never been tested to its limit. Okafor earned his title shot with a five-fight win streak.',
  },
  {
    id: 'luka-petrovic', firstName: 'Luka', lastName: 'Petrović', nickname: 'Zmaj', portrait: portrait('luka-petrovic'),
    nationality: 'Serbia', team: 'Del Perro Grappling', fightingStyle: 'Sambo', divisionId: 'lightweight',
    record: { wins: 9, losses: 2, draws: 1 }, winsByKO: 2, winsBySubmission: 5, winsByDecision: 2,
    height: "5'11\"", weight: '155 lb', reach: '73"', age: 31,
    bio: 'A leg-lock specialist who took Vega into the championship rounds. Petrović is moving up to welterweight for his next outing.',
  },
  {
    id: 'jaylen-brooks', firstName: 'Jaylen', lastName: 'Brooks', nickname: 'Shadow', portrait: portrait('jaylen-brooks'),
    nationality: 'United States', team: 'Davis Street Gym', fightingStyle: 'Boxing', divisionId: 'lightweight',
    record: { wins: 8, losses: 3, draws: 1 }, winsByKO: 5, winsBySubmission: 0, winsByDecision: 3,
    height: "5'8\"", weight: '155 lb', reach: '70"', age: 25,
    bio: 'Slick southpaw with fast hands. His draw with Kenji Arai at Fight Night 00 set up one of the most anticipated rematches on the roster.',
  },
  {
    id: 'kenji-arai', firstName: 'Kenji', lastName: 'Arai', nickname: 'Kaze', portrait: portrait('kenji-arai'),
    nationality: 'Japan', team: 'Little Seoul Dojo', fightingStyle: 'Karate', divisionId: 'lightweight',
    record: { wins: 7, losses: 2, draws: 1 }, winsByKO: 4, winsBySubmission: 1, winsByDecision: 2,
    height: "5'9\"", weight: '155 lb', reach: '72"', age: 26,
    bio: 'Point-karate footwork adapted for the cage. Arai controls range better than anyone at 155.',
  },

  // Welterweight
  {
    id: 'tomas-rivera', firstName: 'Tomás', lastName: 'Rivera', nickname: 'El Martillo', portrait: portrait('tomas-rivera'),
    nationality: 'Colombia', team: 'Vespucci MMA', fightingStyle: 'Mixed', divisionId: 'welterweight',
    record: { wins: 14, losses: 3, draws: 0 }, winsByKO: 9, winsBySubmission: 2, winsByDecision: 3,
    height: "6'0\"", weight: '170 lb', reach: '75"', age: 32,
    bio: 'The first champion in promotion history. Rivera headlined Origins and has not given up the belt since.',
  },
  {
    id: 'noah-van-dijk', firstName: 'Noah', lastName: 'van Dijk', nickname: 'The Dutchman', portrait: portrait('noah-van-dijk'),
    nationality: 'Netherlands', team: 'Mirror Park Muay Thai', fightingStyle: 'Muay Thai', divisionId: 'welterweight',
    record: { wins: 11, losses: 2, draws: 0 }, winsByKO: 8, winsBySubmission: 0, winsByDecision: 3,
    height: "6'2\"", weight: '170 lb', reach: '77"', age: 28,
    bio: 'Clinch knees, teep kicks and a head kick that flattened André Silva in 47 seconds of the second round.',
  },
  {
    id: 'rashid-karimov', firstName: 'Rashid', lastName: 'Karimov', nickname: 'Tsunami', portrait: portrait('rashid-karimov'),
    nationality: 'Kazakhstan', team: 'Sandy Shores Wrestling', fightingStyle: 'Wrestling', divisionId: 'welterweight',
    record: { wins: 10, losses: 1, draws: 0 }, winsByKO: 2, winsBySubmission: 5, winsByDecision: 3,
    height: "5'11\"", weight: '170 lb', reach: '73"', age: 27,
    bio: 'Chain wrestler with suffocating top control. Nobody has kept him on the feet for a full round.',
  },
  {
    id: 'cole-mercer', firstName: 'Cole', lastName: 'Mercer', nickname: 'Hammer', portrait: portrait('cole-mercer'),
    nationality: 'United Kingdom', team: 'Rockford Boxing', fightingStyle: 'Boxing', divisionId: 'welterweight',
    record: { wins: 9, losses: 4, draws: 0 }, winsByKO: 6, winsBySubmission: 0, winsByDecision: 3,
    height: "5'11\"", weight: '170 lb', reach: '74"', age: 30,
    bio: 'A heavy-handed veteran who has shared the cage with the best of the division.',
  },
  {
    id: 'andre-silva', firstName: 'André', lastName: 'Silva', nickname: 'Cobra', portrait: portrait('andre-silva'),
    nationality: 'Brazil', team: 'Del Perro Grappling', fightingStyle: 'Brazilian Jiu-Jitsu', divisionId: 'welterweight',
    record: { wins: 8, losses: 3, draws: 1 }, winsByKO: 1, winsBySubmission: 6, winsByDecision: 1,
    height: "6'0\"", weight: '170 lb', reach: '74"', age: 29,
    bio: 'Black belt with a dangerous guard. Six of his eight wins came by submission.',
  },

  // Middleweight
  {
    id: 'viktor-hale', firstName: 'Viktor', lastName: 'Hale', nickname: 'The Iron', portrait: portrait('viktor-hale'),
    nationality: 'Iceland', team: 'Paleto Strength & Combat', fightingStyle: 'Mixed', divisionId: 'middleweight',
    record: { wins: 13, losses: 1, draws: 0 }, winsByKO: 6, winsBySubmission: 4, winsByDecision: 3,
    height: "6'2\"", weight: '185 lb', reach: '78"', age: 30,
    bio: 'Relentless pace for twenty-five minutes. Hale is the most complete fighter on the roster.',
  },
  {
    id: 'malik-grant', firstName: 'Malik', lastName: 'Grant', nickname: 'Havoc', portrait: portrait('malik-grant'),
    nationality: 'United States', team: 'Davis Street Gym', fightingStyle: 'Kickboxing', divisionId: 'middleweight',
    record: { wins: 11, losses: 3, draws: 0 }, winsByKO: 8, winsBySubmission: 1, winsByDecision: 2,
    height: "6'1\"", weight: '185 lb', reach: '77"', age: 28,
    bio: 'Explosive, unpredictable, and never in a boring fight.',
  },
  {
    id: 'mateo-cruz', firstName: 'Mateo', lastName: 'Cruz', nickname: 'Diablo', portrait: portrait('mateo-cruz'),
    nationality: 'Mexico', team: 'Vespucci MMA', fightingStyle: 'Boxing', divisionId: 'middleweight',
    record: { wins: 10, losses: 4, draws: 0 }, winsByKO: 7, winsBySubmission: 0, winsByDecision: 3,
    height: "6'0\"", weight: '185 lb', reach: '75"', age: 33,
    bio: 'Went five hard rounds with Viktor Hale for the title and came out of it with the respect of the whole division.',
  },
  {
    id: 'emre-yildiz', firstName: 'Emre', lastName: 'Yıldız', nickname: 'Aslan', portrait: portrait('emre-yildiz'),
    nationality: 'Türkiye', team: 'Mirror Park Muay Thai', fightingStyle: 'Muay Thai', divisionId: 'middleweight',
    record: { wins: 9, losses: 2, draws: 0 }, winsByKO: 6, winsBySubmission: 1, winsByDecision: 2,
    height: "6'1\"", weight: '185 lb', reach: '76"', age: 26,
    bio: 'Needed less than two minutes to finish Sam Kowalski. The fastest-rising fighter at 185.',
  },
  {
    id: 'sam-kowalski', firstName: 'Sam', lastName: 'Kowalski', nickname: 'Anvil', portrait: portrait('sam-kowalski'),
    nationality: 'Poland', team: 'Rockford Boxing', fightingStyle: 'Judo', divisionId: 'middleweight',
    record: { wins: 8, losses: 4, draws: 0 }, winsByKO: 3, winsBySubmission: 3, winsByDecision: 2,
    height: "5'11\"", weight: '185 lb', reach: '74"', age: 31,
    bio: 'Judo base, heavy hips and a lot of heart.',
  },

  // Heavyweight
  {
    id: 'oleksandr-bondar', firstName: 'Oleksandr', lastName: 'Bondar', nickname: 'Titan', portrait: portrait('oleksandr-bondar'),
    nationality: 'Ukraine', team: 'Paleto Strength & Combat', fightingStyle: 'Boxing', divisionId: 'heavyweight',
    record: { wins: 11, losses: 1, draws: 0 }, winsByKO: 9, winsBySubmission: 0, winsByDecision: 2,
    height: "6'5\"", weight: '252 lb', reach: '81"', age: 31,
    bio: 'Nine knockouts in eleven wins. Bondar has never needed the judges at CMRP Combat.',
  },
  {
    id: 'jerome-wallace', firstName: 'Jerome', lastName: 'Wallace', nickname: 'The Mountain', portrait: portrait('jerome-wallace'),
    nationality: 'United States', team: 'Sandy Shores Wrestling', fightingStyle: 'Wrestling', divisionId: 'heavyweight',
    record: { wins: 10, losses: 2, draws: 0 }, winsByKO: 5, winsBySubmission: 2, winsByDecision: 3,
    height: "6'4\"", weight: '262 lb', reach: '80"', age: 34,
    bio: 'Former collegiate wrestler. Won a razor-close split decision over Lars Eriksen at Fight Night 00.',
  },
  {
    id: 'tane-rawiri', firstName: 'Tane', lastName: 'Rāwiri', nickname: 'Taniwha', portrait: portrait('tane-rawiri'),
    nationality: 'New Zealand', team: 'Vespucci MMA', fightingStyle: 'Kickboxing', divisionId: 'heavyweight',
    record: { wins: 9, losses: 3, draws: 0 }, winsByKO: 7, winsBySubmission: 0, winsByDecision: 2,
    height: "6'3\"", weight: '248 lb', reach: '79"', age: 29,
    bio: 'Fast for his size and dangerous in every exchange.',
  },
  {
    id: 'lars-eriksen', firstName: 'Lars', lastName: 'Eriksen', nickname: 'Frost', portrait: portrait('lars-eriksen'),
    nationality: 'Norway', team: 'Paleto Strength & Combat', fightingStyle: 'Judo', divisionId: 'heavyweight',
    record: { wins: 8, losses: 2, draws: 0 }, winsByKO: 3, winsBySubmission: 3, winsByDecision: 2,
    height: "6'6\"", weight: '258 lb', reach: '82"', age: 30,
    bio: 'Gets his title shot against Bondar after the split-decision loss to Wallace was widely disputed.',
  },
  {
    id: 'deshawn-price', firstName: 'DeShawn', lastName: 'Price', nickname: 'Freight Train', portrait: portrait('deshawn-price'),
    nationality: 'United States', team: 'Strawberry Boxing Club', fightingStyle: 'Street / Brawler', divisionId: 'heavyweight',
    record: { wins: 7, losses: 3, draws: 0 }, winsByKO: 6, winsBySubmission: 0, winsByDecision: 1,
    height: "6'2\"", weight: '265 lb', reach: '78"', age: 27,
    bio: 'All gas, no brakes.',
  },
]
