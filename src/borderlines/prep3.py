"""Build game-data.js: question pool + daily schedule + basemap."""
import json, hashlib, os, sys
from shapely.geometry import shape, mapping, box, MultiPolygon
from shapely.geometry.polygon import orient
from shapely.ops import unary_union
sys.path.insert(0, os.path.dirname(__file__))
from questions import POOL as OLD_POOL, DAILY as OLD_DAILY
from meta import META
from basics import BASICS
from daily30 import NEW
import random
DAILY_START = '2026-09-27'  # launch day (2026-10-08) is daily #12; the 11 before it are the archive
import colorsys

SRC = "/home/claude/data/historical-basemaps/geojson"
HERE = os.path.dirname(os.path.abspath(__file__))
_cache = {}


def world(y):
    if y not in _cache:
        _cache[y] = json.load(open(f"{SRC}/world_{y}.geojson"))
    return _cache[y]


def rnd(o, nd):
    if isinstance(o, float): return round(o, nd)
    if isinstance(o, (list, tuple)): return [rnd(x, nd) for x in o]
    return o


def d3orient(g):
    if g.geom_type == "Polygon": return orient(g, -1.0)
    if g.geom_type == "MultiPolygon": return MultiPolygon([orient(p, -1.0) for p in g.geoms])
    return g


def gout(g, nd=3):
    m = mapping(d3orient(g))
    return {"type": m["type"], "coordinates": rnd(m["coordinates"], nd)}


def year_label(y):
    return f"{y[2:]} BC" if y.startswith("bc") else y


def year_num(y):
    return -int(y[2:]) if y.startswith("bc") else int(y)


def build(item, qid):
    y, name, label, tier, fact = item[:5]
    parts = [shape(f["geometry"]).buffer(0) for f in world(y)["features"] if f["properties"].get("NAME") == name]
    assert parts, (y, name)
    g = unary_union(parts).intersection(box(-170, -58, 180, 84)).simplify(0.03, preserve_topology=True)
    if g.geom_type == "MultiPolygon":
        big = max(p.area for p in g.geoms)
        g = unary_union([p for p in g.geoms if p.area > max(0.05, min(0.3, big * 0.004))])
    x0, y0, x1, y1 = g.bounds
    assert x1 - x0 < 300, (name, "crosses antimeridian")
    # View: a region around the answer, padded and nudged so the answer isn't dead centre.
    h = int(hashlib.md5(qid.encode()).hexdigest(), 16)
    w, hgt = x1 - x0, y1 - y0
    span = max(w * 2.4, hgt * 2.4 * 1.5, 34)
    cx = (x0 + x1) / 2 + ((h % 1000) / 1000 - 0.5) * 0.35 * w
    cy = (y0 + y1) / 2 + (((h >> 10) % 1000) / 1000 - 0.5) * 0.35 * hgt
    vh = span / 1.5
    view = [round(max(-180, cx - span / 2), 1), round(max(-58, cy - vh / 2), 1), round(min(180, cx + span / 2), 1), round(min(80, cy + vh / 2), 1)]
    (clon, clat, cname), col = (item[5], item[6]) if len(item) > 5 else META[(y, name)]
    from shapely.geometry import Point
    if not g.buffer(1.0).contains(Point(clon, clat)): print("  !! capital outside polygon:", y, name, cname, round(g.distance(Point(clon, clat)), 1))
    return {"id": qid, "year": year_num(y), "yearLabel": year_label(y), "label": label, "tier": tier, "fact": fact,
            "capital": [clon, clat, cname], "color": band(col), "geometry": gout(g)}, g.area


def band(hexc):
    r, g_, b = (int(hexc[i:i + 2], 16) / 255 for i in (1, 3, 5))
    h, l, s = colorsys.rgb_to_hls(r, g_, b)
    l = min(max(l, 0.30), 0.48); s = min(max(s, 0.08), 0.62)
    r, g_, b = colorsys.hls_to_rgb(h, l, s)
    return "#%02x%02x%02x" % tuple(round(v * 255) for v in (r, g_, b))


pool = []
for i, it in enumerate(BASICS):
    q, a = build(it, f"b{i+1}")
    pool.append(q)
    print(f"pool {q['id']:4} {q['yearLabel']:>7} {q['label']:32} t{q['tier']} area={a:.0f}")

# Old pool + old dailies become 12 balanced daily sets: 1 hard, 1-2 easy, rest medium.
old = OLD_POOL + [x for d in OLD_DAILY for x in d]
rng = random.Random(7)
by = {t: [x for x in old if x[3] == t] for t in (1, 2, 3)}
for t in by: rng.shuffle(by[t])
ndays = len(old) // 5
days = [[] for _ in range(ndays)]
for i in range(ndays): days[i].append(by[3].pop())
for i in range(ndays): days[i].append(by[1].pop())
i = 0
while by[1]: days[i].append(by[1].pop()); i += 3
rest = by[2] + by[3]
for d in days:
    while len(d) < 5:
        # avoid repeating a label inside one day
        j = next(k for k, x in enumerate(rest) if x[2] not in {y[2] for y in d})
        d.append(rest.pop(j))
assert not rest and all(len(d) == 5 for d in days)

def balance(items, seed):
    r = random.Random(seed)
    by = {t: [x for x in items if x[3] == t] for t in (1, 2, 3)}
    for t in by: r.shuffle(by[t])
    n = len(items) // 5
    ds = [[] for _ in range(n)]
    for i in range(n): ds[i].append(by[3].pop())
    for i in range(n): ds[i].append(by[1].pop())
    i = 0
    while by[1]: ds[i % n].append(by[1].pop()); i += 4
    rest = by[2] + by[3]
    r.shuffle(rest)
    for d in ds:
        while len(d) < 5:
            j = next(k for k, x in enumerate(rest) if x[2] not in {y[2] for y in d} and x[1] not in {y[1] for y in d})
            d.append(rest.pop(j))
    assert not rest
    return ds

days += balance(NEW, 11)
daily = []
for di, day in enumerate(days):
    day.sort(key=lambda x: x[3])
    qs = []
    for j, it in enumerate(day):
        q, a = build(it, f"d{di+1}-{j+1}")
        qs.append(q)
    daily.append(qs)
    print(f"day{di+1:2}", " | ".join(f"{q['yearLabel']} {q['label']} (t{q['tier']})" for q in qs))

land = json.load(open(f"{HERE}/data/ne_50m_land.geojson"))
land_g = unary_union([shape(f["geometry"]).buffer(0) for f in land["features"]]).simplify(0.04, preserve_topology=True)
land_g = land_g.intersection(box(-180, -58, 180, 84))
rivers = json.load(open(f"{HERE}/data/ne_50m_rivers.geojson"))
riv_g = unary_union([shape(f["geometry"]).simplify(0.04) for f in rivers["features"]
                     if f["properties"].get("featurecla") == "River" and f["properties"].get("scalerank", 9) <= 4])
lakes = json.load(open(f"{HERE}/data/ne_50m_lakes.geojson"))
lake_g = unary_union([shape(f["geometry"]).buffer(0) for f in lakes["features"]
                      if f["properties"].get("scalerank", 9) <= 2]).simplify(0.04, preserve_topology=True)

data = {"dailyStart": DAILY_START, "pool": pool, "daily": daily,
        "land": gout(land_g, 2), "rivers": gout(riv_g, 2), "lakes": gout(lake_g, 2)}
out = f"{HERE}/game-data.js"
with open(out, "w") as fh:
    fh.write("window.GAME_DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
print("size KB:", os.path.getsize(out) // 1024)
