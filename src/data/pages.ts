/** Editorial copy for the About and legal pages. Kept out of JSX so another server can rewrite it. */

export const about = {
  statement: 'Organised violence, in character.',
  intro:
    'CMRP Combat is the official fight promotion of the CMRP roleplay server. Real rules, real rankings, real titles — all inside the city.',
  sections: [
    {
      title: 'What it is',
      text: 'A professional fight organisation that lives entirely in the roleplay world. Fighters are characters, fight nights are live in-city events, and every result becomes part of the story.',
    },
    {
      title: 'Part of CMRP',
      text: 'CMRP Combat runs on the CMRP server. Promoters, referees, commentators and fighters are all players. What happens in the cage carries over into the rest of the city.',
    },
    {
      title: 'How fights work',
      text: 'Fights are sanctioned and booked by matchmaking. Three rounds, or five for title and main events. A referee runs the bout, judges score it, and the result goes into the official record.',
    },
    {
      title: 'How to join',
      text: 'Register your character, pick a weight class and wait for matchmaking to reach out on Discord. New fighters debut on the prelims. Win, and you move up the card.',
    },
  ],
}

export const legal: Record<string, { title: string; updated: string; body: string[] }> = {
  terms: {
    title: 'Terms',
    updated: '2026-06-01',
    body: [
      'CMRP Combat is a fictional organisation that exists within the CMRP roleplay server. Names, events, records and results on this site describe roleplay characters, not real people or real sporting events.',
      'By registering a fighter you confirm that the details describe your roleplay character and that you follow the CMRP server rules.',
      'Placeholder text. Replace with your server’s own terms before going live.',
    ],
  },
  privacy: {
    title: 'Privacy',
    updated: '2026-06-01',
    body: [
      'When you register a fighter, we store the details you submit, including your Discord username, so matchmaking can contact you.',
      'We do not sell or share your data. Ask on Discord to have your registration removed.',
      'Placeholder text. Replace with your server’s own privacy policy before going live.',
    ],
  },
}
