"""Import ChatGPT-generated images from ~/Downloads into public/images (resized + compressed)."""
import os, sys
from PIL import Image

DL = os.path.expanduser("~/Downloads")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")

# download name -> (dest path, max width, kind)
MAP = {
    "sw-workshop.png": ("about/workshop.jpg", 2000, "jpg"),
    "sw-technician.png": ("about/technician.jpg", 1100, "jpg"),
    "sw-testing.png": ("about/testing.jpg", 1100, "jpg"),
    "sw-sector-commercial.png": ("sectors/commercial.jpg", 1000, "jpg"),
    "sw-sector-industrial.png": ("sectors/industrial.jpg", 1000, "jpg"),
    "sw-sector-residential.png": ("sectors/residential.jpg", 1000, "jpg"),
    "sw-sector-infrastructure.png": ("sectors/infrastructure.jpg", 1000, "jpg"),
    "sw-skyline.png": ("about/skyline.jpg", 2200, "jpg"),
}
MAP.update({
    "sw-pill-copper.png": ("home/pill-copper.jpg", 600, "jpg"),
    "sw-pill-skyline.png": ("home/pill-skyline.jpg", 600, "jpg"),
    "sw-cta-home.png": ("cta/home.jpg", 2000, "jpg"),
    "sw-cta-about.png": ("cta/about.jpg", 2000, "jpg"),
    "sw-cta-solutions.png": ("cta/solutions.jpg", 2000, "jpg"),
    "sw-cta-products.png": ("cta/products.jpg", 2000, "jpg"),
    "sw-about-quality.png": ("about/quality.jpg", 1100, "jpg"),
    "sw-solutions-hero.png": ("solutions/hero.jpg", 1400, "jpg"),
    "sw-products-lineup.png": ("products/lineup.webp", 1800, "webp"),
})
for code in ["steel", "grp", "stainless", "atex"]:
    MAP[f"sw-enc-{code}.png"] = (f"solutions/enclosure-{code}.jpg", 1200, "jpg")
for code in ["consult", "build", "test", "deliver"]:
    MAP[f"sw-proc-{code}.png"] = (f"solutions/process-{code}.jpg", 1200, "jpg")
for code in ["mdb", "smdb", "fdb", "ats", "mcc", "plc", "capacitor", "socket"]:
    MAP[f"sw-inst-{code}.png"] = (f"installed/{code}.jpg", 900, "jpg")
for code in ["mdb", "smdb", "fdb", "ats", "mcc", "plc", "capacitor", "socket"]:
    MAP[f"sw-product-{code}.png"] = (f"products/{code}.webp", 900, "webp")

def knock_out_white(im):
    """Make an opaque white studio background transparent (flood fill from the edges)."""
    alpha = im.getchannel("A")
    if alpha.getextrema()[0] < 250:
        return im  # already has transparency
    from PIL import ImageDraw, ImageFilter
    rgb = im.convert("RGB")
    w, h = rgb.size
    marker = (255, 0, 254)
    for xy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (0, h // 2), (w - 1, h // 2)]:
        if min(rgb.getpixel(xy)) > 235:
            ImageDraw.floodfill(rgb, xy, marker, thresh=18)
    mask = Image.eval(rgb.convert("RGB").split()[1], lambda v: 0)  # blank
    px = rgb.load()
    m = mask.load()
    for y in range(h):
        for x in range(w):
            m[x, y] = 0 if px[x, y] == marker else 255
    mask = mask.filter(ImageFilter.GaussianBlur(0.8))
    im.putalpha(mask)
    return im


done = []
for src, (dest, maxw, kind) in MAP.items():
    p = os.path.join(DL, src)
    if not os.path.exists(p):
        continue
    im = Image.open(p)
    if im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    out = os.path.join(OUT, dest)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    if kind == "jpg":
        # trim a few px at the edges (generator corner marks) and save progressive JPEG
        w, h = im.size
        im = im.convert("RGB").crop((0, 0, w, h - max(2, h // 120)))
        im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
    else:
        im = knock_out_white(im.convert("RGBA"))
        bbox = im.getchannel("A").getbbox()
        if bbox:
            pad = 24
            im = im.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(im.width, bbox[2] + pad), min(im.height, bbox[3] + pad)))
        im.save(out, "WEBP", quality=86, method=6)
    done.append((dest, os.path.getsize(out) // 1024))
for d in done:
    print(f"{d[0]:32} {d[1]} KB")
