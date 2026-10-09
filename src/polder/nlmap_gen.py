import json
from shapely.geometry import shape, Polygon, box, mapping
from shapely.ops import unary_union
nl=shape(json.load(open('nl.json'))[0]['geometry']).intersection(box(3,50.7,7.5,53.8))
water=Polygon([(4.95,52.93),(5.05,52.98),(5.20,53.04),(5.38,53.10),(5.40,53.06),(5.42,52.98),(5.40,52.94),(5.36,52.88),(5.50,52.85),(5.71,52.84),(5.62,52.80),(5.60,52.66),(5.65,52.60),(5.80,52.58),(5.85,52.55),(5.83,52.45),(5.60,52.36),(5.48,52.28),(5.20,52.33),(5.07,52.32),(4.99,52.38),(5.10,52.46),(5.07,52.50),(5.06,52.64),(5.29,52.70),(5.11,52.77),(5.00,52.86)])
flevo=Polygon([(5.43,52.52),(5.70,52.585),(5.80,52.575),(5.82,52.46),(5.60,52.37),(5.48,52.30),(5.22,52.355),(5.26,52.39),(5.40,52.45)])
nop=Polygon([(5.71,52.835),(5.84,52.79),(5.95,52.68),(5.82,52.60),(5.70,52.595),(5.61,52.66),(5.62,52.80)])
wier=Polygon([(4.98,52.92),(5.10,52.88),(5.15,52.78),(5.02,52.78),(4.95,52.85)])
zz=unary_union([water,flevo,nop])
fries=Polygon([(4.85,53.8),(7.4,53.8),(7.4,52.85),(7.0,52.85),(6.75,52.95),(6.55,53.08),(6.35,53.05),(6.25,52.90),(6.05,52.83),(5.84,52.79),(5.71,52.84),(5.35,52.88),(5.30,53.12),(4.85,53.22)])
holl=Polygon([(3.9,51.75),(4.4,51.70),(4.65,51.72),(4.98,51.83),(5.0,51.95),(4.95,52.10),(5.10,52.25),(5.07,52.33),(5.35,52.45),(5.35,53.2),(4.5,53.25),(3.9,52.5)])
zeel=Polygon([(3.2,51.15),(4.30,51.20),(4.28,51.33),(4.25,51.50),(4.22,51.62),(4.05,51.72),(3.6,51.80),(3.2,51.75)])
land=nl.difference(water)
R={}
R['friesland']=land.intersection(fries).difference(zz)
R['holland']=land.intersection(holl).difference(fries).difference(zz)
R['zeeland']=land.intersection(zeel).difference(holl)
R['zzwater']=nl.intersection(water).union(water.difference(nl).buffer(0) if False else water)  # water body itself
R['zzland']=unary_union([flevo,nop,wier.intersection(nl)])
R['rest']=land.difference(R['friesland']).difference(R['holland']).difference(R['zeeland']).difference(R['zzland'])
k=150; c=0.612
def P(lon,lat): return ((lon-3.2)*k*c+10,(53.75-lat)*k+10)
def path(g):
    g=g.simplify(0.004)
    out=[]
    for p in getattr(g,'geoms',[g]):
        if p.is_empty or p.area<1e-5: continue
        for ring in [p.exterior]+list(p.interiors):
            pts=[P(*xy) for xy in ring.coords]
            out.append('M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in pts)+'Z')
    return ' '.join(out)
res={k2:path(v) for k2,v in R.items()}
lab={'friesland':(5.95,53.17),'holland':(4.62,52.30),'zeeland':(3.85,51.52),'zuiderzee':(5.42,52.68)}
res['labels']={a:P(*b) for a,b in lab.items()}
x1,y1=P(7.3,50.7); res['vb']=[round(x1+10),round(y1+10)]
json.dump(res,open('regions.json','w'))
print({a:len(b) for a,b in res.items() if isinstance(b,str)}, res['vb'])
