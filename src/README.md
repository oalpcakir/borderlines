# Homo Ludens — source

Build sources behind the published site (the repo's `public/` folder holds the built pages).

## portal/
- `portal.html` — portal template ({{POSTHOG}}, {{LAND}}, {{REALM}}, {{W}}, {{H}} placeholders for the analytics snippet and the map plate).

## borderlines/ (No. 1)
- `game.html` — game template; `/*DATA*/` is replaced by the page data (practice pool, base map, each daily's difficulty tiers).
- Each daily's realms live in `public/borderlines/days/<n>.json` and are fetched when that day is played, so the page stays the same size however many days there are.
- `data/base.json` — practice pool + base map. `data/history.json` — which realm and year every daily used (the updater's memory).
- `build_borderlines.py` — writes `public/borderlines/index.html` and updates the daily count in the portal.
- `auto_update.py` + `catalog.py` — the monthly updater. `.github/workflows/borderlines-monthly.yml` runs it on the 1st of every month: it adds enough days to stay ~5 weeks ahead (about 30), checks each realm against historical-basemaps (shape exists, big enough, capital inside), commits and pushes; Cloudflare redeploys. To add realms, add lines to `catalog.py`. To test locally: `python3 src/borderlines/auto_update.py --data <historical-basemaps>/geojson --today 2026-12-01 --dry-run`.
- `questions.py`, `basics.py`, `daily30.py`, `meta.py`, `prep3.py`, `build_site.py` — the original hand-made lists and one-off builders for days 1–42 and the pool. The updater reads the lists (old realms can come back as reruns) but the builders are no longer part of the pipeline.
- `posthog_head.html` — shared analytics snippet (PostHog US, cookieless), also used by Retourvloot.

## retourvloot/ (No. 2)
- Plain HTML/JS: `model.js`, `events.js`, `images.js`, `tut.js`, `ui.js`, `head.html`, `body.html`; images in `img/`.
- `build_retourvloot.py` — writes `public/retourvloot/` and `public/og-retourvloot.png`. `node test.js` runs a headless balance test.
- See `retourvloot/README.md` for details.

## cupoftea/ (No. 3)
- `scene1.html`, `scene2.html`, `scene3.html` — one self-contained page per scene (data, puzzle logic, Web Audio sound, the reprinted-receipt card). Design notes and the solution tables live in the project's TASARIM.md.
- `build_cupoftea.py` — adds the shared head (meta tags, icon, analytics, feedback button) and writes `public/cupoftea/` (scene 1), `public/cupoftea/2/`, `public/cupoftea/3/`, plus `public/og-cupoftea.png` and the portal plate.
- Progress is kept in the player's browser under `cupoftea.v1` (scenes solved, blots per scene); the portal reads it for the "Continue" card.

## Deploy & feedback
- `wrangler.jsonc` deploys `public/` to Cloudflare Workers; pushes to main redeploy.
- `worker.js` adds one route, `/api/feedback`: checks messages (Turnstile, rate limit) and posts them to Discord.
- Worker secrets: `DISCORD_WEBHOOK_URL`, `TURNSTILE_SECRET` (set with `wrangler secret put`). The public Turnstile site key is in `public/feedback.js`.
- The feedback form doesn't work on a plain local server; everything else is static.
