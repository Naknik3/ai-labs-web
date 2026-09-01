#!/usr/bin/env python3
"""Re-render every brand file the site serves from the ARC-7 icon handoff.

Deliberately NOT wired into `npm run build`: it needs the app repo's icon
handoff on disk, which the build host does not have. Run it by hand when the
mark changes, then commit the results.

    SRC=~/Downloads/icon-handoff python3 scripts/gen-icons.py

Needs Pillow. The recipe, the source render and the reasoning behind each
target live in the handoff's own README; the table in ours says which file
feeds which surface.
"""

from PIL import Image, ImageDraw
import os

SRC = os.path.expanduser(os.environ.get("SRC", "~/Downloads/icon-handoff"))
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")
GROUND = (0x17, 0x12, 0x2A, 255)

def load(p):
    return Image.open(os.path.join(SRC, p)).convert("RGBA")

master = load("app_icon.png")            # 1024 full-bleed
foreground = load("app_icon_foreground.png")
mono = load("app_icon_monochrome.png")

def flatten(im):
    bg = Image.new("RGBA", im.size, GROUND)
    return Image.alpha_composite(bg, im).convert("RGB")

def resize(im, s):
    return im.resize((s, s), Image.LANCZOS)

def rounded(im, s, pct=0.2237):
    """Square tile resampled to s, corners cut to the handoff's 22.37% radius."""
    tile = flatten(resize(im, s)).convert("RGBA")
    mask = Image.new("L", (s * 4, s * 4), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, s * 4 - 1, s * 4 - 1), radius=int(round(pct * s * 4)), fill=255
    )
    tile.putalpha(mask.resize((s, s), Image.LANCZOS))
    return tile

def save(im, rel, **kw):
    p = os.path.join(OUT, rel)
    im.save(p, **kw)
    print(f"{rel:42} {im.size[0]}x{im.size[1]} {im.mode} {os.path.getsize(p):>7} B")

# Browser tab. Rounded so the dark tile keeps its shape against dark chrome.
ico = os.path.join(OUT, "favicon.ico")
rounded(master, 48).save(ico, sizes=[(16, 16), (32, 32), (48, 48)])
print(f"{'favicon.ico':42} 16/32/48        {os.path.getsize(ico):>7} B")
save(rounded(master, 96), "favicon-96.png", optimize=True)

# iOS home screen: opaque and full-bleed, iOS applies its own mask.
save(flatten(resize(master, 180)), "apple-touch-icon.png", optimize=True)

# Web app manifest, purpose "any".
save(rounded(master, 192), "brand/icon-192.png", optimize=True)
save(rounded(master, 512), "brand/icon-512.png", optimize=True)

# purpose "maskable": art at 62% fill, inside the 80% safe circle.
save(flatten(resize(foreground, 512)), "brand/icon-maskable-512.png", optimize=True)

# og:image / twitter:image - opaque, social cards render PNG alpha unpredictably.
save(flatten(master), "brand/mark-1024.png", optimize=True)

# The kit.
save(rounded(master, 1024), "brand/mark-round-1024.png", optimize=True)
save(resize(mono, 1024), "brand/mark-mono-1024.png", optimize=True)

# In-page mark. Square: Header/Footer/CTA CSS already rounds it themselves.
save(flatten(resize(master, 256)), "brand/mark-256.png", optimize=True)
