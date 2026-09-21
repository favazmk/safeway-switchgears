#!/usr/bin/env node
/**
 * Converts the hero film into a scroll-scrub frame sequence.
 *
 *   npm run hero -- path/to/video.mp4 [--fps 12] [--start 0] [--end 24]
 *                   [--mobile portrait.mp4] [--mobile-start 0]
 *                   [--delogo x:y:w:h] [--mobile-delogo x:y:w:h] [--sharpen 0.8]
 *
 * With --mobile, mobile frames come from that portrait video (trimmed by
 * --mobile-start) instead of a center crop of the desktop film.
 *
 * Outputs to public/hero/:
 *   desktop/0001.webp …   1600px wide
 *   mobile/0001.webp  …    900px wide (center-cropped to portrait-ish 4:5)
 *   poster.webp            first frame (shown before frames load)
 *   poster-end.webp        last frame  (reduced-motion fallback)
 *   manifest.json          read by src/components/ScrollHero.tsx
 *
 * Requires ffmpeg on PATH.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const opt = (name, def) => (flag(name) === undefined ? def : Number(flag(name)));
const mobileInput = flag("mobile");
const input = args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));

if (!input || !existsSync(input) || (mobileInput && !existsSync(mobileInput))) {
  console.error(
    "Usage: npm run hero -- path/to/video.mp4 [--fps 12] [--start 0] [--end 24] [--mobile portrait.mp4] [--mobile-start 0] [--delogo x:y:w:h] [--mobile-delogo x:y:w:h]",
  );
  process.exit(1);
}

const fps = opt("fps", 12);
const start = opt("start", 0);
const end = opt("end", 0);
const mobileStart = opt("mobile-start", start);
// Mild unsharp mask at native size (0 disables). Adds no detail, but the canvas
// upscale to fill the screen starts from a crisper frame. Enlarging offline
// instead costs far more decode time for almost no visible gain.
const sharpen = opt("sharpen", 0.8);
const sharp = sharpen > 0 ? `,unsharp=5:5:${sharpen}:5:5:0.0` : "";
const out = resolve("public/hero");

const trimArgs = (s) => [...(s ? ["-ss", String(s)] : []), ...(end ? ["-to", String(end)] : [])];

// Generator watermarks sit at a fixed spot, so one delogo pass removes them.
// Box is x:y:w:h in SOURCE pixels, which is why it runs before any crop/scale.
const delogo = (box) => {
  if (!box) return "";
  const [x, y, w, h] = box.split(":").map(Number);
  if ([x, y, w, h].some((v) => !Number.isFinite(v))) {
    console.error("--delogo / --mobile-delogo expect x:y:w:h in source pixels");
    process.exit(1);
  }
  return `delogo=x=${x}:y=${y}:w=${w}:h=${h},`;
};

function ffmpeg(dir, vf, quality, src = input, trim = trimArgs(start)) {
  const target = join(out, dir);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  const r = spawnSync(
    "ffmpeg",
    [
      "-hide_banner", "-loglevel", "error", "-y",
      ...trim, "-i", src,
      "-an", "-vf", `fps=${fps},${vf}${sharp}`,
      "-c:v", "libwebp", "-quality", String(quality), "-compression_level", "6",
      join(target, "%04d.webp"),
    ],
    { stdio: "inherit" },
  );
  if (r.status !== 0) process.exit(r.status ?? 1);
  return readdirSync(target).filter((f) => f.endsWith(".webp")).length;
}

mkdirSync(out, { recursive: true });
console.log(`Extracting desktop frames @ ${fps}fps…`);
const frames = ffmpeg("desktop", `${delogo(flag("delogo"))}scale=min(1600\\,iw):-2:flags=lanczos`, 82);
console.log(`Extracting mobile frames…`);
// A dedicated portrait video is used as-is; otherwise the desktop film is center-cropped.
const mobileFrames = mobileInput
  ? ffmpeg("mobile", `${delogo(flag("mobile-delogo"))}scale=720:-2:flags=lanczos`, 80, mobileInput, trimArgs(mobileStart))
  : ffmpeg("mobile", `${delogo(flag("delogo"))}crop=min(iw\\,ih*4/5):ih,scale=900:-2:flags=lanczos`, 68);

copyFileSync(join(out, "desktop", "0001.webp"), join(out, "poster.webp"));
copyFileSync(join(out, "desktop", `${String(frames).padStart(4, "0")}.webp`), join(out, "poster-end.webp"));

const probe = (dir) => {
  const r = spawnSync("ffprobe", [
    "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
    "-of", "csv=p=0", join(out, dir, "0001.webp"),
  ]);
  const [width, height] = r.stdout.toString().trim().split(",").map(Number);
  return { width, height };
};

const manifest = {
  frames: Math.min(frames, mobileFrames),
  ext: "webp",
  poster: "/hero/poster.webp",
  desktop: { dir: "/hero/desktop/", ...probe("desktop") },
  mobile: { dir: "/hero/mobile/", ...probe("mobile") },
};
writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Done: ${manifest.frames} frames →`, out);
