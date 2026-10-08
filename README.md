# Homo Ludens

Small games about the past: short history games with one mechanic, one idea, and a note on what really happened. Named after Johan Huizinga's 1938 book.

▶ **Visit:** [borderlines.oalpcakir.workers.dev](https://borderlines.oalpcakir.workers.dev)

## Games

| No. | Game | |
|---|---|---|
| 1 | **Borderlines** | Paint the land a historical realm ruled. Daily challenge. |

---

## No. 1 — Borderlines

**Every empire had its edges. Can you find them?**

Borderlines is a daily history map game. You get a year and the name of a realm — the Ottoman Empire in 1530, the Inca in 1530, Aksum in 500 — and a world map with no modern borders. Paint the land you think it ruled, then see how close you came.

▶ **Play:** [borderlines.oalpcakir.workers.dev/borderlines/](https://borderlines.oalpcakir.workers.dev/borderlines/)

## How to play

- **Paint** the territory by dragging across the map. Paint only sticks to land.
- **Fill**: draw an outline, then click inside it to flood the area. Coastlines count as edges.
- **Erase** to clean up, **+ / −** or scroll to zoom, hold **Space** to move the map.
- **Submit** to see the real borders. Your score balances two things:
  - **Coverage** — how much of the realm you painted
  - **Precision** — how much of your paint landed inside it
- Stuck? **Hints** zoom you to the right region (−10) or show the capital (−15).

## Modes

- **Daily Challenge** — five new realms every day, from easy to hard. Keep your streak going.
- **Practice** — five random realms from a pool that grows with every past daily.
- **Past challenges** — catch up on dailies you missed (they don't count toward your streak).
- **Statistics** — games played, averages, best scores and streaks.

After each round you get a short note on what was happening in that realm at the time.

## Ranks

From *Master Cartographer* down to *Here Be Dragons*.

## Spotted a mistake?

Historical borders are approximate, and some are disputed. Use **Report a problem** on the result card, or open an issue in this repository.

## Credits

- Historical borders: [historical-basemaps](https://github.com/aourednik/historical-basemaps) by André Ourednik and contributors (GPL-3.0)
- Base map, coastlines, rivers and lakes: [Natural Earth](https://www.naturalearthdata.com/) (public domain)
- Rendering: [D3.js](https://d3js.org/)
- Fonts: Libre Caslon Display, IBM Plex Sans and IBM Plex Mono via Google Fonts

## Licence

The game code is released under GPL-3.0 to match the historical borders dataset it is built on.

## Running it yourself

Everything is static: `public/index.html` is the portal and each game lives in its own folder (`public/borderlines/`). Deploy the repo to any static host. The included `wrangler.jsonc` deploys it to Cloudflare Workers as a static site.

---

Part of **Homo Ludens**.
