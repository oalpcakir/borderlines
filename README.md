# Homo Ludens

Small games about the past: short history games with one mechanic, one idea, and a note on what really happened. Named after Johan Huizinga's 1938 book.

▶ **Play:** [homoludens.oalpcakir.workers.dev](https://homoludens.oalpcakir.workers.dev)

## Games

| No. | Game | What you do | Length |
|---|---|---|---|
| 1 | [**Borderlines**](https://homoludens.oalpcakir.workers.dev/borderlines/) | Paint the land a historical realm ruled, then see how close you came. Daily challenge. | 5 minutes |
| 2 | [**Retourvloot**](https://homoludens.oalpcakir.workers.dev/retourvloot/) | Run the Dutch East India Company from Amsterdam, 1602–1799. Letters from Batavia take a year. | 30–80 minutes, desktop |

## Spotted a mistake?

History is messy and some of it is disputed. Use the **Feedback** button on any page, or open an issue in this repository.

## Credits

- **Borderlines:** historical borders from [historical-basemaps](https://github.com/aourednik/historical-basemaps) (André Ourednik and contributors, GPL-3.0); base map from [Natural Earth](https://www.naturalearthdata.com/) (public domain); rendering with [D3.js](https://d3js.org/).
- **Retourvloot:** all images from the [Rijksmuseum](https://www.rijksmuseum.nl/), public domain (CC0); full list in the game's Sources page.
- Fonts via Google Fonts.

## Licence

Game code is released under GPL-3.0, matching the historical borders dataset Borderlines is built on.

## Running it yourself

Everything is static. `public/index.html` is the portal, and each game lives in its own folder under `public/`. Sources and build scripts are in `src/` (see `src/README.md`). The included `wrangler.jsonc` deploys the site to Cloudflare Workers; `worker.js` adds one route, `/api/feedback`, which checks messages (Turnstile, rate limit) and posts them to Discord. It needs two secrets, `DISCORD_WEBHOOK_URL` and `TURNSTILE_SECRET`, and the Turnstile site key in `public/feedback.js`.
