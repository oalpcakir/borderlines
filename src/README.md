# Homo Ludens — source

Build sources behind the published site (the repo's `public/` folder holds the built pages).

## portal/
- `portal.html` — portal template ({{POSTHOG}}, {{LAND}}, {{REALM}}, {{W}}, {{H}} placeholders for the analytics snippet and the map plate).

## borderlines/ (No. 1)
- `game.html` — game template; `/*DATA*/` is replaced by the generated `game-data.js`.
- `questions.py`, `basics.py`, `daily30.py`, `meta.py` — realm lists (dailies and practice pool), capitals and colours.
- `prep3.py` — builds `game-data.js` from historical-basemaps and Natural Earth. `DAILY_START` sets launch day.
- `build_site.py` — writes `public/borderlines/` and the portal.
- `posthog_head.html` — shared analytics snippet (PostHog US, cookieless), also used by Retourvloot.

## retourvloot/ (No. 2)
- Plain HTML/JS: `model.js`, `events.js`, `images.js`, `tut.js`, `ui.js`, `head.html`, `body.html`; images in `img/`.
- `build_retourvloot.py` — writes `public/retourvloot/` and `public/og-retourvloot.png`. `node test.js` runs a headless balance test.
- See `retourvloot/README.md` for details.

