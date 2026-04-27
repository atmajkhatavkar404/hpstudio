#!/usr/bin/env node
/**
 * Scans public/images/<category>/ and writes public/images/manifest.json.
 *
 * Supports TWO levels:
 *   public/images/wedding/photo.jpg          → "loose" photo in wedding category
 *   public/images/wedding/pream-radha/01.jpg → album "pream-radha" in wedding
 *
 * Run manually:   node scripts/generate-image-manifest.mjs
 * Run via bun:    bun run images:manifest
 *
 * Designed to handle 8,000+ images efficiently.
 */
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "public", "images");
const OUT = join(ROOT, "manifest.json");
const VALID = /\.(jpe?g|png|webp|avif|gif)$/i;

if (!existsSync(ROOT)) {
  console.error("public/images/ not found");
  process.exit(1);
}

const categories = {};
let total = 0;

for (const catName of readdirSync(ROOT)) {
  const catPath = join(ROOT, catName);
  if (!statSync(catPath).isDirectory()) continue;

  const albums = {};
  const loose = [];

  for (const entry of readdirSync(catPath)) {
    const entryPath = join(catPath, entry);

    if (statSync(entryPath).isDirectory()) {
      // This is an album sub-directory
      const photos = readdirSync(entryPath)
        .filter((f) => VALID.test(f))
        .sort()
        .map((f) => `/images/${catName}/${entry}/${f}`);

      if (photos.length) {
        albums[entry] = { photos };
        total += photos.length;
      }
    } else if (VALID.test(entry)) {
      // Loose image file directly in category
      loose.push(`/images/${catName}/${entry}`);
      total++;
    }
  }

  loose.sort();

  if (Object.keys(albums).length || loose.length) {
    categories[catName] = { albums, loose };
  }
}

const manifest = { generatedAt: new Date().toISOString(), total, categories };

writeFileSync(OUT, JSON.stringify(manifest, null, 2));
console.log(`✓ Wrote ${OUT}`);
console.log(`  ${total} images across ${Object.keys(categories).length} categories`);
for (const [cat, data] of Object.entries(categories)) {
  const albumCount = Object.keys(data.albums).length;
  const albumPhotos = Object.values(data.albums).reduce((s, a) => s + a.photos.length, 0);
  console.log(`    ${cat}: ${data.loose.length} loose, ${albumCount} albums (${albumPhotos} photos)`);
}
