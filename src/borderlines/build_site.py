"""Assemble the deployable site into ../ship2/public from templates + generated data."""
import json, shutil, os
H = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(H, "..", "ship2", "public")
SITE = "https://homoludens.oalpcakir.workers.dev"
ph = open(f"{H}/posthog_head.html").read().strip()

def og(title, desc, url, img):
    return (f'<meta property="og:type" content="website">\n<meta property="og:title" content="{title}">\n'
            f'<meta property="og:description" content="{desc}">\n<meta property="og:url" content="{url}">\n'
            f'<meta property="og:image" content="{img}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
            f'<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="{img}">\n')

# --- game ---
g = open(f"{H}/game.html").read().replace("/*DATA*/", open(f"{H}/game-data.js").read())
head = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="A daily history map game. Paint the land a historical realm ruled, then see how close you came.">
{og("Borderlines", "You get a year and a realm. Paint the land it ruled. A daily history map game.", SITE + "/borderlines/", SITE + "/og-borderlines.png")}<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%231f2b4a'/%3E%3Cpath d='M7 22l6-12 5 8 3-4 4 8z' fill='%23f7f6f2'/%3E%3C/svg%3E">
<script>
  window.BORDERLINES_CONFIG = {{
    reportEndpoint: "",
    siteUrl: "{SITE}/borderlines/",
    portalUrl: "/"
  }};
</script>
{ph}
<style>html,body{{margin:0}}[hidden]{{display:none!important}}</style>
'''
i = g.index('<div id="app">')
os.makedirs(f"{OUT}/borderlines", exist_ok=True)
open(f"{OUT}/borderlines/index.html", "w").write(head + g[:i] + "</head>\n<body>\n" + g[i:] + "\n</body>\n</html>\n")

# --- portal ---
svg = json.load(open(f"{H}/portal_svg.json"))
p = open(f"{H}/portal.html").read()
p = p.replace("{{POSTHOG}}", ph).replace("{{LAND}}", svg["land"]).replace("{{REALM}}", svg["realm"]).replace("{{W}}", str(svg["W"])).replace("{{H}}", str(svg["H"]))
p = p.replace('<meta property="og:title" content="Homo Ludens">\n<meta property="og:description" content="Small games about the past.">\n',
              og("Homo Ludens", "Small games about the past. Short history games: one mechanic, one idea, and what really happened.", SITE + "/", SITE + "/og-homoludens.png"))
assert "og:image" in p
open(f"{OUT}/index.html", "w").write(p)
for src, dst in [("../og/bl.png", "og-borderlines.png"), ("../og/hl.png", "og-homoludens.png")]:
    shutil.copy(os.path.join(H, src), f"{OUT}/{dst}")
print("built", OUT)
