# Homo Ludens — source

Build sources behind the published site (the repo's `public/` folder holds the built pages).

## borderlines/
- `game.html` — game template; `/*DATA*/` is replaced by the generated `game-data.js`.
- `questions.py` — the 60 original realms (now the first 12 dailies); `basics.py` — the 50-realm practice pool; `daily30.py` — dailies 13–42; `meta.py` — capitals and colours for the original 60.
- `prep3.py` — builds `game-data.js` from historical-basemaps (github.com/aourednik/historical-basemaps, `geojson/`) and Natural Earth 50m land/lakes/rivers. Paths at the top of the script point to where those were downloaded. `DAILY_START` sets launch day (launch = Daily #12).
- `posthog_head.html` — analytics snippet (PostHog US, cookieless) injected into the page head.
- Build: `python3 prep3.py`, then replace `/*DATA*/` in `game.html` with `game-data.js`, add the head (config + PostHog), save as `public/borderlines/index.html`.

## portal/
- `portal.html` — Homo Ludens portal template ({{POSTHOG}}, {{LAND}}, {{REALM}}, {{W}}, {{H}} placeholders for the analytics snippet and the map plate).

## tulips/ (No. 2, parked)
- Research report on tulipmania (Turkish) with three game concepts; the chosen one is "Windhandel".
- `tavern-study.html` + `draw.py` — the annotated cutaway style study.
