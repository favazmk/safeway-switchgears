# Safeway Electric Switchgear Trading LLC: Website

5-page corporate site (Home, About, Solutions, Products, Contact) built with
Next.js 16 + Tailwind CSS 4, exported as a **static site** (plain HTML/CSS/JS).

## Develop

```bash
npm install
npm run dev        # http://localhost:3210
```

## Build & deploy

```bash
npm run build      # outputs the static site to ./out
```

Upload the contents of `out/` to any host (Hostinger `public_html`, cPanel,
Netlify, Vercel, S3…). No Node server is needed.

## Home hero scroll film

The home hero plays a film frame-by-frame as the visitor scrolls
(`src/components/ScrollHero.tsx`). Until a film is added it shows a still poster.

1. Put the final edited video anywhere, e.g. `video/hero.mp4` (16:9, 20–30 s works best).
2. Run (requires `ffmpeg` on PATH):

   ```bash
   npm run hero -- video/hero.mp4
   ```

   Options: `--fps 12` (frames per second of video, higher = smoother but heavier),
   `--start 0 --end 24` (trim, in seconds).

3. This writes `public/hero/desktop/*.webp`, `public/hero/mobile/*.webp`,
   `poster.webp`, `poster-end.webp` and `manifest.json`. Rebuild and deploy.

Caption timing lives in the `BEATS` array in `ScrollHero.tsx` (values are 0–1 scroll
progress). The defaults assume the storyboard: panel interior → door closes → switch
ON (≈0–0.33) → current travels along cables (≈0.33–0.66) → darkness → factory lights
up (≈0.66–1). Adjust `from`/`to` to match the final cut. Section scroll length is
`h-[700svh]` on the hero `<section>`.

## Scroll motion

Built with GSAP ScrollTrigger + Lenis smooth scrolling (all respect `prefers-reduced-motion`):

| Component | What it does |
|---|---|
| `motion/PanelAssembly.tsx` | Pinned section: an SVG switchgear panel assembles layer by layer, door closes, switch turns on |
| `motion/SolutionsRail.tsx` | Giant "Our solutions" type drifts while product cards scroll horizontally (swipe on mobile) |
| `motion/PowerLine.tsx` | A winding power line draws with scroll; a current pulse lights up each milestone |
| `motion/FillText.tsx` | Headings fill word-by-word with inline image/icon pills |
| `motion/ParallaxImage.tsx`, `DriftText.tsx`, `ProductStage.tsx`, `Counter.tsx` | Parallax photos, drifting type, floating product cut-outs, count-ups |

## Images

Every image slot on the site uses its own photo (no image is reused across pages).
Photography and product cut-outs were generated with ChatGPT and imported with:

```bash
python scripts/import-generated.py   # reads ~/Downloads/sw-*.png → public/images (resized, compressed, white backgrounds removed)
```

`public/images/` layout: `about/`, `cta/` (one banner per page), `home/` (inline pills),
`installed/` (on-site photo per product, used on the home rail), `products/` (studio cut-outs),
`sectors/`, `solutions/` (hero, enclosures, process), `brands/`.
Brochure photos that are no longer used live outside `public/` in `brochure-assets/`.

## Layout checks

A Playwright script checks every page at 7 viewports (360 → 1920) for clipped text,
text overlapping text and horizontal overflow, scrolling through each page so pinned and
animated sections are checked in every state. It lives outside the repo (session scratchpad);
re-create it if needed, or check visually after layout changes.

## Content

All company data (phones, addresses, map pins, brands, specs, products) is in
`src/lib/site.ts`. Brand logos are in `public/images/brands/`.

## Contact form

The site is static, so the enquiry form opens the visitor's email app addressed
to `switchgear@safewaytechnical.com`. To receive submissions directly, connect a
form service (e.g. Formspree, Web3Forms) in `src/components/EnquiryForm.tsx`.
