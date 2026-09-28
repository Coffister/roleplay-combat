# CMRP Combat

Fight-promotion website for the CMRP FiveM roleplay server. It covers events, fight cards, fighters, rankings, results, news and fighter registration.

It is built to be reused. To run it for another server, you change config and data files. Components stay as they are.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
```

Stack: React 19, TypeScript, Vite, React Router, Motion, Lucide. Styling is CSS Modules plus design tokens (CSS custom properties). There is no UI kit. The Aceternity-style effects (Spotlight, Moving Border, grid backdrop, animated tabs) are small local ports in `src/components/effects` and `src/components/ui`.

## Rebranding for another server

| What | Where |
|---|---|
| Name, tagline, colors, fonts, social links, site URL, timezone | `src/config/brand.ts` |
| Logo mark, favicon, OG image | `public/assets/brand/` |
| Navigation | `src/config/navigation.ts` |
| Divisions, card groups, result methods, fighting styles | `src/config/site.ts` |
| Fighters, fights, events, rankings, news | `src/data/*.ts` |
| About / Terms / Privacy copy | `src/data/pages.ts` |

The site is in Czech (`cs-CZ`, `Europe/Prague` in `brand.ts`). Content text is in `src/data/` and labels in `src/config/`. Short UI strings (buttons, headings) are written directly in the components. There is no i18n layer, because only one language is needed. Add one if the site ever needs to be multilingual.

At build time, `vite.config.ts` injects the brand colors and fonts into `index.html` as CSS variables. Restart `npm run dev` after editing `brand.ts`.

## Architecture

```
src/
  config/      brand + site configuration (no UI)
  types/       data model
  data/        placeholder content, the only place fighter/event data lives
  lib/         queries.ts (the only reader of data/), formatting, SEO
  services/    registrationService (HTTP / dev mock / "not open yet")
  styles/      tokens.css, global.css
  components/  ui/ effects/ fighter/ fight/ event/ ranking/ news/
  layouts/     header, footer, root layout
  pages/       one lazy-loaded page per route
```

Pages never import from `data/`. Everything goes through `lib/queries.ts`, so moving to an API or database later only changes that file.

## Registration

`registrationService.submit()` posts multipart form data to `VITE_REGISTRATION_ENDPOINT` (see `.env.example`) and expects `{ "reference": "..." }` back.

- Without an endpoint, `npm run dev` uses a mock that logs to the console and stores nothing.
- A production build without an endpoint shows "registration not open yet". It never pretends to succeed.

## Known limits

- **Link previews:** this is a client-rendered app. Page titles and meta update in the browser, but Discord and social previews only see the defaults in `index.html`. Add a prerender step if per-page previews matter.
- **OG image format:** `og.svg` is a placeholder. Most platforms, Discord included, need a 1200×630 PNG or JPG.
- **Placeholder art:** fighter portraits and news images are placeholders. See `public/assets/README.md`.
