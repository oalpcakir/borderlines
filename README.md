# Borderlines — deploy notes

The whole game is one file: `index.html` (map data and all 60 + 150 + 50 realms are inside it).

## Publish
1. Create a GitHub repo (e.g. `borderlines`) and upload `index.html`.
2. Connect the repo to Cloudflare Pages (or Netlify / GitHub Pages). Build command: none. Output dir: `/`.
3. Point your domain or a subdomain (e.g. `borderlines.yoursite.com`) at it.

## Configure (top of index.html, the CONFIG block)
- **Analytics:** paste the PostHog snippet where marked. All events (app_open, tutorial_*, game_start,
  round_start, hint_used, round_submit, game_complete, share_copy, stats_open, archive_open,
  report_open, report_sent) go through `posthog.capture` with a stable anonymous `pid`.
- **Reports:** set `reportEndpoint` to a Formspree form URL (or any endpoint accepting JSON POST).

## Launch date
`DAILY_START` in the data is 2026-09-27, which makes 2026-10-08 Daily #12 (11 archive days before it).
To launch on another day, rebuild with `DAILY_START = launch day - 11 days`.

## Data / licence
Historical borders: historical-basemaps by Ourednik (GPL-3.0). Base map: Natural Earth (public domain).
Credit both on the site. The borders data is GPL-3.0; the simplest way to respect that is to keep the repo public.
