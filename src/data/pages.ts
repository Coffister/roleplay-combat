/** Editorial copy for the About and legal pages. Kept out of JSX so another server can rewrite it. */

export const about = {
  statement: 'Organizované násilí. V roli.',
  intro:
    'CMRP Combat je oficiální bojová organizace roleplay serveru CMRP. Skutečná pravidla, skutečné žebříčky, skutečné tituly — to vše přímo ve městě.',
  sections: [
    {
      title: 'Co to je',
      text: 'Profesionální bojová organizace, která žije výhradně v roleplay světě. Zápasníci jsou postavy, galavečery jsou živé akce ve městě a každý výsledek se stává součástí příběhu.',
    },
    {
      title: 'Součást CMRP',
      text: 'CMRP Combat běží na serveru CMRP. Promotéři, rozhodčí, komentátoři i zápasníci jsou hráči. Co se stane v kleci, se promítne do celého města.',
    },
    {
      title: 'Jak probíhají zápasy',
      text: 'Zápasy schvaluje a páruje matchmaking. Tři kola, u titulových a hlavních zápasů pět. Zápas řídí rozhodčí, bodují ho bodoví rozhodčí a výsledek se zapíše do oficiálních záznamů.',
    },
    {
      title: 'Jak se zapojit',
      text: 'Zaregistruj svou postavu, vyber váhovou kategorii a počkej, až se ti matchmaking ozve na Discordu. Nováčci debutují na předkartě. Vyhraj a posuneš se výš.',
    },
  ],
}

export const legal: Record<string, { title: string; updated: string; body: string[] }> = {
  terms: {
    title: 'Podmínky',
    updated: '2026-06-01',
    body: [
      'CMRP Combat je fiktivní organizace, která existuje v rámci roleplay serveru CMRP. Jména, akce, bilance a výsledky na tomto webu popisují roleplay postavy, nikoli skutečné osoby ani skutečné sportovní akce.',
      'Registrací zápasníka potvrzuješ, že údaje popisují tvou roleplay postavu a že dodržuješ pravidla serveru CMRP.',
      'Zástupný text. Před spuštěním nahraď vlastními podmínkami serveru.',
    ],
  },
  privacy: {
    title: 'Ochrana soukromí',
    updated: '2026-06-01',
    body: [
      'Při registraci zápasníka ukládáme údaje, které odešleš, včetně Discord uživatelského jména, aby tě mohl kontaktovat matchmaking.',
      'Tvoje data neprodáváme ani nesdílíme. O smazání registrace si můžeš říct na Discordu.',
      'Zástupný text. Před spuštěním nahraď vlastními zásadami ochrany soukromí.',
    ],
  },
}
