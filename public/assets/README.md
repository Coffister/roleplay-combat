# Assets

All images here are **placeholders**. Replace them with your own. Keep the same filenames, or update the paths in `src/data/`.

| Folder | Used for | Format |
|---|---|---|
| `brand/` | `mark.svg` (header/footer logo mark), `favicon.svg`, `og.svg` (social preview, replace with a 1200×630 PNG and update `brand.ts`) | SVG / PNG |
| `fighters/` | One portrait per fighter, named `<fighter-id>` | Transparent cut-out PNG/WebP, 4:5, **subject facing right** (the B corner is mirrored automatically), around 800×1000 |
| `events/` | Optional event posters (`poster` in `src/data/events.ts`). Without a poster, the main-event face-off is shown instead | 16:10 JPG/WebP |
| `news/` | Article images | 16:9 JPG/WebP, around 1600×900 |
| `backgrounds/` | Reserved for background imagery | JPG/WebP |

If a portrait fails to load, the UI falls back to the fighter's initials.
