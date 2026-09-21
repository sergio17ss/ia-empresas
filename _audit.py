import re, json, html

p = "/Users/sergiodelvallebusto/ia-empresas/guias/ahorro-pymes-ia/index.html"
s = open(p).read()

# 1. title
t = re.search(r'<title>(.*?)</title>', s).group(1)
print("TITLE:", t, "| len:", len(t))
print("H1:", re.search(r'<h1>(.*?)</h1>', s).group(1))

# 2. lang
print("LANG:", re.search(r'<html lang="([^"]+)"', s).group(1))

# 3. canonical exact
print("CANONICAL:", re.search(r'rel="canonical" href="([^"]+)"', s).group(1))

# 4. meta description has cifra?
md = re.search(r'name="description" content="([^"]+)"', s).group(1)
print("HAS CIFRA (3700):", "3.700" in md, "| HAS €:", "€" in md)

# og tags
for og in re.findall(r'property="og:([^"]+)" content="([^"]+)"', s):
    print("og:", og[0], "=", og[1])
print("og:url == canonical:", re.search(r'property="og:url" content="([^"]+)"', s).group(1) ==
      re.search(r'rel="canonical" href="([^"]+)"', s).group(1))

# 5. JSON-LD blocks
blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
def normal(txt):
    return re.sub(r'\s+',' ', html.unescape(txt)).strip().lower()
faq_q, faq_a = {}, {}
for b in blocks:
    blk = json.loads(b)
    if blk.get("@type")=="Article":
        print("\nJSON-LD Article: headline, mainEntityOfPage ok:", blk.get("mainEntityOfPage"))
        print("  author:", blk.get("author",{}).get("name"), "| inLanguage:", blk.get("inLanguage"))
    if blk.get("@type")=="FAQPage":
        for q in blk["mainEntity"]:
            faq_q[normal(q["name"])] = normal(q["acceptedAnswer"]["text"])
        print("JSON-LD FAQ count:", len(blk["mainEntity"]))
        print("JSON-LD Article count in doc:", sum(1 for b in blocks if json.loads(b).get('@type')=='Article'))

# visible FAQ (details/summary + <p>)
details = re.findall(r'<details>\s*<summary>(.*?)</summary>\s*<p>(.*?)</p>', s, re.S)
vis_q = [(normal(q), normal(a)) for q,a in details]
print("\nVISIBLE FAQ count:", len(vis_q))
print("FAQ match JSON-LD questions:", len(vis_q)==len(faq_q))
for q,a in vis_q:
    match = q in faq_q
    sameans = match and faq_q[q]==a
    print(("QMATCH " if match else "QMISS "), q[:60], "| answer same:", sameans)

# Quick Duel and rating
print("\n'El duelo' present:", "El duelo." in s)
print("Veredicto duelo present:", "Veredicto: gana" in s)
print("Rating 4/5 present:", '<div class="rating-score">4/5</div>' in s)
print("TL;DR present:", "TL;DR" in s)
print("Table count:", s.count("<table>"))
