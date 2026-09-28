import type { Fighter } from '../types'

const portrait = (id: string) => `/assets/fighters/${id}.svg`

export const fighters: Fighter[] = [
  // Lehká váha
  {
    id: 'marcus-vega', firstName: 'Marcus', lastName: 'Vega', nickname: 'The Wolf', portrait: portrait('marcus-vega'),
    nationality: 'Mexiko', team: 'Vespucci MMA', fightingStyle: 'Box', divisionId: 'lightweight',
    record: { wins: 12, losses: 2, draws: 0 }, winsByKO: 7, winsBySubmission: 2, winsByDecision: 3,
    height: '178 cm', weight: '70 kg', reach: '183 cm', age: 29,
    bio: 'Prošel undergroundovými zápasy v Cypress Flats dávno předtím, než CMRP Combat vznikl. Vega boxuje za vysokým krytím a trpělivým direktem, a jakmile uvidí šanci, ukončí to rychle. Od startu organizace je neporažený.',
  },
  {
    id: 'dante-okafor', firstName: 'Dante', lastName: 'Okafor', nickname: 'Bull', portrait: portrait('dante-okafor'),
    nationality: 'Nigérie', team: 'Strawberry Boxing Club', fightingStyle: 'Kickbox', divisionId: 'lightweight',
    record: { wins: 10, losses: 3, draws: 0 }, winsByKO: 6, winsBySubmission: 0, winsByDecision: 4,
    height: '175 cm', weight: '70 kg', reach: '180 cm', age: 27,
    bio: 'Neustálý tlak dopředu, tvrdé low kicky a brada, kterou ještě nikdo pořádně neprověřil. Šanci na titul si Okafor vybojoval sérií pěti výher.',
  },
  {
    id: 'luka-petrovic', firstName: 'Luka', lastName: 'Petrović', nickname: 'Zmaj', portrait: portrait('luka-petrovic'),
    nationality: 'Srbsko', team: 'Del Perro Grappling', fightingStyle: 'Sambo', divisionId: 'lightweight',
    record: { wins: 9, losses: 2, draws: 1 }, winsByKO: 2, winsBySubmission: 5, winsByDecision: 2,
    height: '180 cm', weight: '70 kg', reach: '185 cm', age: 31,
    bio: 'Specialista na páky na nohy, který dotáhl Vegu až do šampionských kol. Na další zápas se Petrović posouvá do velterové váhy.',
  },
  {
    id: 'jaylen-brooks', firstName: 'Jaylen', lastName: 'Brooks', nickname: 'Shadow', portrait: portrait('jaylen-brooks'),
    nationality: 'USA', team: 'Davis Street Gym', fightingStyle: 'Box', divisionId: 'lightweight',
    record: { wins: 8, losses: 3, draws: 1 }, winsByKO: 5, winsBySubmission: 0, winsByDecision: 3,
    height: '173 cm', weight: '70 kg', reach: '178 cm', age: 25,
    bio: 'Mrštný levák s rychlýma rukama. Jeho remíza s Kenjim Araiem na Fight Night 00 odstartovala jednu z nejočekávanějších odvet v organizaci.',
  },
  {
    id: 'kenji-arai', firstName: 'Kenji', lastName: 'Arai', nickname: 'Kaze', portrait: portrait('kenji-arai'),
    nationality: 'Japonsko', team: 'Little Seoul Dojo', fightingStyle: 'Karate', divisionId: 'lightweight',
    record: { wins: 7, losses: 2, draws: 1 }, winsByKO: 4, winsBySubmission: 1, winsByDecision: 2,
    height: '175 cm', weight: '70 kg', reach: '183 cm', age: 26,
    bio: 'Karatistická práce nohou přenesená do klece. Vzdálenost v lehké váze nekontroluje nikdo lépe než Arai.',
  },

  // Velterová váha
  {
    id: 'tomas-rivera', firstName: 'Tomás', lastName: 'Rivera', nickname: 'El Martillo', portrait: portrait('tomas-rivera'),
    nationality: 'Kolumbie', team: 'Vespucci MMA', fightingStyle: 'Kombinovaný', divisionId: 'welterweight',
    record: { wins: 14, losses: 3, draws: 0 }, winsByKO: 9, winsBySubmission: 2, winsByDecision: 3,
    height: '183 cm', weight: '77 kg', reach: '191 cm', age: 32,
    bio: 'První šampion v historii organizace. Rivera byl hlavní hvězdou Origins a pás od té doby nepustil.',
  },
  {
    id: 'noah-van-dijk', firstName: 'Noah', lastName: 'van Dijk', nickname: 'The Dutchman', portrait: portrait('noah-van-dijk'),
    nationality: 'Nizozemsko', team: 'Mirror Park Muay Thai', fightingStyle: 'Thajský box', divisionId: 'welterweight',
    record: { wins: 11, losses: 2, draws: 0 }, winsByKO: 8, winsBySubmission: 0, winsByDecision: 3,
    height: '188 cm', weight: '77 kg', reach: '196 cm', age: 28,
    bio: 'Kolena z klinče, teepy a kop na hlavu, který poslal André Silvu k zemi po 47 sekundách druhého kola.',
  },
  {
    id: 'rashid-karimov', firstName: 'Rashid', lastName: 'Karimov', nickname: 'Tsunami', portrait: portrait('rashid-karimov'),
    nationality: 'Kazachstán', team: 'Sandy Shores Wrestling', fightingStyle: 'Zápas', divisionId: 'welterweight',
    record: { wins: 10, losses: 1, draws: 0 }, winsByKO: 2, winsBySubmission: 5, winsByDecision: 3,
    height: '180 cm', weight: '77 kg', reach: '185 cm', age: 27,
    bio: 'Řetězí jedno strhnutí za druhým a nahoře dusí. Celé kolo ho ve stoje ještě nikdo neudržel.',
  },
  {
    id: 'cole-mercer', firstName: 'Cole', lastName: 'Mercer', nickname: 'Hammer', portrait: portrait('cole-mercer'),
    nationality: 'Spojené království', team: 'Rockford Boxing', fightingStyle: 'Box', divisionId: 'welterweight',
    record: { wins: 9, losses: 4, draws: 0 }, winsByKO: 6, winsBySubmission: 0, winsByDecision: 3,
    height: '180 cm', weight: '77 kg', reach: '188 cm', age: 30,
    bio: 'Veterán s těžkýma rukama, který v kleci potkal ty nejlepší z divize.',
  },
  {
    id: 'andre-silva', firstName: 'André', lastName: 'Silva', nickname: 'Cobra', portrait: portrait('andre-silva'),
    nationality: 'Brazílie', team: 'Del Perro Grappling', fightingStyle: 'Brazilské jiu-jitsu', divisionId: 'welterweight',
    record: { wins: 8, losses: 3, draws: 1 }, winsByKO: 1, winsBySubmission: 6, winsByDecision: 1,
    height: '183 cm', weight: '77 kg', reach: '188 cm', age: 29,
    bio: 'Černý pás s nebezpečným guardem. Šest z osmi výher vyhrál submisí.',
  },

  // Střední váha
  {
    id: 'viktor-hale', firstName: 'Viktor', lastName: 'Hale', nickname: 'The Iron', portrait: portrait('viktor-hale'),
    nationality: 'Island', team: 'Paleto Strength & Combat', fightingStyle: 'Kombinovaný', divisionId: 'middleweight',
    record: { wins: 13, losses: 1, draws: 0 }, winsByKO: 6, winsBySubmission: 4, winsByDecision: 3,
    height: '188 cm', weight: '84 kg', reach: '198 cm', age: 30,
    bio: 'Neúprosné tempo po celých dvacet pět minut. Hale je nejkompletnější zápasník na soupisce.',
  },
  {
    id: 'malik-grant', firstName: 'Malik', lastName: 'Grant', nickname: 'Havoc', portrait: portrait('malik-grant'),
    nationality: 'USA', team: 'Davis Street Gym', fightingStyle: 'Kickbox', divisionId: 'middleweight',
    record: { wins: 11, losses: 3, draws: 0 }, winsByKO: 8, winsBySubmission: 1, winsByDecision: 2,
    height: '185 cm', weight: '84 kg', reach: '196 cm', age: 28,
    bio: 'Výbušný, nevyzpytatelný a nikdy v nudném zápase.',
  },
  {
    id: 'mateo-cruz', firstName: 'Mateo', lastName: 'Cruz', nickname: 'Diablo', portrait: portrait('mateo-cruz'),
    nationality: 'Mexiko', team: 'Vespucci MMA', fightingStyle: 'Box', divisionId: 'middleweight',
    record: { wins: 10, losses: 4, draws: 0 }, winsByKO: 7, winsBySubmission: 0, winsByDecision: 3,
    height: '183 cm', weight: '84 kg', reach: '191 cm', age: 33,
    bio: 'S Viktorem Halem odbojoval pět tvrdých kol o titul a odnesl si respekt celé divize.',
  },
  {
    id: 'emre-yildiz', firstName: 'Emre', lastName: 'Yıldız', nickname: 'Aslan', portrait: portrait('emre-yildiz'),
    nationality: 'Turecko', team: 'Mirror Park Muay Thai', fightingStyle: 'Thajský box', divisionId: 'middleweight',
    record: { wins: 9, losses: 2, draws: 0 }, winsByKO: 6, winsBySubmission: 1, winsByDecision: 2,
    height: '185 cm', weight: '84 kg', reach: '193 cm', age: 26,
    bio: 'Samu Kowalskiho ukončil za necelé dvě minuty. Nejrychleji stoupající zápasník střední váhy.',
  },
  {
    id: 'sam-kowalski', firstName: 'Sam', lastName: 'Kowalski', nickname: 'Anvil', portrait: portrait('sam-kowalski'),
    nationality: 'Polsko', team: 'Rockford Boxing', fightingStyle: 'Judo', divisionId: 'middleweight',
    record: { wins: 8, losses: 4, draws: 0 }, winsByKO: 3, winsBySubmission: 3, winsByDecision: 2,
    height: '180 cm', weight: '84 kg', reach: '188 cm', age: 31,
    bio: 'Judistický základ, těžké boky a obrovské srdce.',
  },

  // Těžká váha
  {
    id: 'oleksandr-bondar', firstName: 'Oleksandr', lastName: 'Bondar', nickname: 'Titan', portrait: portrait('oleksandr-bondar'),
    nationality: 'Ukrajina', team: 'Paleto Strength & Combat', fightingStyle: 'Box', divisionId: 'heavyweight',
    record: { wins: 11, losses: 1, draws: 0 }, winsByKO: 9, winsBySubmission: 0, winsByDecision: 2,
    height: '196 cm', weight: '114 kg', reach: '206 cm', age: 31,
    bio: 'Devět knockoutů v jedenácti výhrách. V CMRP Combat Bondar rozhodčí nikdy nepotřeboval.',
  },
  {
    id: 'jerome-wallace', firstName: 'Jerome', lastName: 'Wallace', nickname: 'The Mountain', portrait: portrait('jerome-wallace'),
    nationality: 'USA', team: 'Sandy Shores Wrestling', fightingStyle: 'Zápas', divisionId: 'heavyweight',
    record: { wins: 10, losses: 2, draws: 0 }, winsByKO: 5, winsBySubmission: 2, winsByDecision: 3,
    height: '193 cm', weight: '119 kg', reach: '203 cm', age: 34,
    bio: 'Bývalý univerzitní zápasník. Na Fight Night 00 porazil Larse Eriksena těsným nejednotným rozhodnutím.',
  },
  {
    id: 'tane-rawiri', firstName: 'Tane', lastName: 'Rāwiri', nickname: 'Taniwha', portrait: portrait('tane-rawiri'),
    nationality: 'Nový Zéland', team: 'Vespucci MMA', fightingStyle: 'Kickbox', divisionId: 'heavyweight',
    record: { wins: 9, losses: 3, draws: 0 }, winsByKO: 7, winsBySubmission: 0, winsByDecision: 2,
    height: '191 cm', weight: '112 kg', reach: '201 cm', age: 29,
    bio: 'Na svou váhu rychlý a nebezpečný v každé výměně.',
  },
  {
    id: 'lars-eriksen', firstName: 'Lars', lastName: 'Eriksen', nickname: 'Frost', portrait: portrait('lars-eriksen'),
    nationality: 'Norsko', team: 'Paleto Strength & Combat', fightingStyle: 'Judo', divisionId: 'heavyweight',
    record: { wins: 8, losses: 2, draws: 0 }, winsByKO: 3, winsBySubmission: 3, winsByDecision: 2,
    height: '198 cm', weight: '117 kg', reach: '208 cm', age: 30,
    bio: 'Po sporné porážce s Wallacem dostává šanci na titul proti Bondarovi.',
  },
  {
    id: 'deshawn-price', firstName: 'DeShawn', lastName: 'Price', nickname: 'Freight Train', portrait: portrait('deshawn-price'),
    nationality: 'USA', team: 'Strawberry Boxing Club', fightingStyle: 'Pouliční rváč', divisionId: 'heavyweight',
    record: { wins: 7, losses: 3, draws: 0 }, winsByKO: 6, winsBySubmission: 0, winsByDecision: 1,
    height: '188 cm', weight: '120 kg', reach: '198 cm', age: 27,
    bio: 'Plný plyn, žádné brzdy.',
  },
]
