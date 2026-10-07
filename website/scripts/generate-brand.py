"""Regenerate portable SVG brand assets from the source symbols and licensed font."""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / ".tooling/python"))
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

source = (ROOT / "components/nv/brand.tsx").read_text(encoding="utf-8")
core = re.search(r'monogramPath = "([^"]+)"', source).group(1)
paths = {"core": core}
paths.update(dict(re.findall(r'(solutions|hub|med|lex):"([^"]+)"', source)))
colors = {"core": "#6ba7ff", "solutions": "#afbcce", "hub": "#86aaff", "med": "#65dac5", "lex": "#dbb989"}
font = TTFont(ROOT / "node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2")
cmap = font.getBestCmap()
units = font["head"].unitsPerEm

def outline(text, weight, offset=0, tracking=-1.6):
    glyphs = font.getGlyphSet(location={"wght": weight})
    scale = 44 / units
    x = offset
    parts = []
    for char in text:
        name = cmap[ord(char)]
        glyph = glyphs[name]
        pen = SVGPathPen(glyphs)
        glyph.draw(pen)
        parts.append(f'<path d="{pen.getCommands()}" transform="translate({x:.3f} 55) scale({scale:.6f} {-scale:.6f})"/>')
        x += glyph.width * scale + tracking
    return "".join(parts), x

def svg(content, width, height, label):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{label}">{content}</svg>\n'

for brand, color in colors.items():
    folder = ROOT / "public/brand" / brand
    folder.mkdir(parents=True, exist_ok=True)
    label = f"NV {brand.title()}"
    symbol = f'<path fill="{color}" d="{paths[brand]}"/>'
    (folder / "symbol.svg").write_text(svg(symbol, 106, 60, label), encoding="utf-8")
    (folder / "reduced.svg").write_text(svg(symbol, 106, 60, label), encoding="utf-8")
    nv, cursor = outline("nv", 600, offset=0)
    weight = {"hub": 500, "med": 500, "lex": 300}.get(brand, 400)
    sub, end = outline(brand, weight, offset=cursor + (7 if brand == "lex" else 3), tracking=1.5 if brand == "lex" else -1.6)
    width = round(end + 12)
    for theme, foreground in [("light", "#f1f5fb"), ("dark", "#080e18")]:
        wordmark = f'<g fill="{foreground}">{nv}{sub}</g>'
        (folder / f"wordmark-{theme}.svg").write_text(svg(wordmark, width, 76, label), encoding="utf-8")
        lockup = f'<g transform="translate(8 17) scale(.7)">{symbol}</g><g transform="translate(99 0)">{wordmark}</g>'
        (folder / f"lockup-{theme}.svg").write_text(svg(lockup, width + 99, 76, label), encoding="utf-8")
    icon = f'<rect width="112" height="112" rx="18" fill="#080e18"/><g transform="translate(3 25)">{symbol}</g>'
    (folder / "app-icon.svg").write_text(svg(icon, 112, 112, label), encoding="utf-8")
    (folder / "favicon.svg").write_text(svg(icon, 112, 112, label), encoding="utf-8")

(ROOT / "public/favicon.svg").write_text((ROOT / "public/brand/core/favicon.svg").read_text(), encoding="utf-8")
(ROOT / "public/brand/SpaceGrotesk-OFL.txt").write_text((ROOT / "node_modules/@fontsource-variable/space-grotesk/LICENSE").read_text(), encoding="utf-8")
(ROOT / "public/brand/brand-manifest.json").write_text(json.dumps({"architecture":"NV Core > NV Products / NV Solutions","brands":colors,"symbols":"Shared diagonal geometry; independent product signals","wordmarks":"Outlined Space Grotesk; no external font dependency"}, indent=2), encoding="utf-8")
print(f"Generated {len(colors) * 8} SVG assets with outlined wordmarks.")
