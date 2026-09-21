import re, os

base = "/Users/sergiodelvallebusto/ia-empresas"
ART = os.path.join(base, "guias", "ahorro-pymes-ia")
html = open(os.path.join(ART, "index.html")).read()

# grab hrefs with optional anchor
raw = re.findall(r'href="([^"#]+?)(?:#[^"]*)?"', html)
seen = {}
for h in raw:
    if h in seen: continue
    if h.startswith(("http", "data:", "mailto:", "tel:")): continue
    if ".png" in h or "fonts" in h: continue
    seen[h] = None

for h in sorted(seen):
    up = h.count("../")
    rel = h[h.rfind("../")+3:] if up else h
    segs = [s for s in rel.split("/") if s]
    tgt = ART
    for _ in range(up):
        tgt = os.path.dirname(tgt)
    for s in segs:
        tgt = os.path.join(tgt, s)
    # dir link (with trailing slash) or resource with extension
    if h.endswith("/") or "." not in segs[-1]:
        exists = os.path.isfile(os.path.join(tgt, "index.html"))
        kind = "dir"
    else:
        exists = os.path.isfile(tgt)
        kind = "file"
    print(("OK  " if exists else "MISS"), f"{h:52} [{kind}] -> {tgt}")
