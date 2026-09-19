#!/usr/bin/env node
/**
 * Converts the hero film into a scroll-scrub frame sequence.
 *
 *   npm run hero -- path/to/video.mp4 [--fps 12] [--start 0] [--end 24]
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
const input = args.find((a) => !a.startsWith("--") && !/^\d/.test(a));
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? def : Number(args[i + 1]);
};

if (!input || !existsSync(input)) {
  console.error("Usage: npm run hero -- path/to/video.mp4 [--fps 12] [--start 0] [--end 24]");
  process.exit(1);
}

const fps = opt("fps", 12);
const start = opt("start", 0);
const end = opt("end", 0);
const out = resolve("public/hero");

const trim = [...(start ? ["-ss", String(start)] : []), ...(end ? ["-to", String(end)] : [])];

function ffmpeg(dir, vf, quality) {
  const target = join(out, dir);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  const r = spawnSync(
    "ffmpeg",
    [
      "-hide_banner", "-loglevel", "error", "-y",
      ...trim, "-i", input,
      "-an", "-vf", `fps=${fps},${vf}`,
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
const frames = ffmpeg("desktop", "scale=1600:-2:flags=lanczos", 72);
console.log(`Extracting mobile frames…`);
const mobileFrames = ffmpeg("mobile", "crop=min(iw\\,ih*4/5):ih,scale=900:-2:flags=lanczos", 68);

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
