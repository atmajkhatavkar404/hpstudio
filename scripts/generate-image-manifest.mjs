#!/usr/bin/env node
/**
 * Scans public/images/<category>/ and writes public/images/manifest.json.
 *
 * Supports THREE levels:
 *   public/images/wedding/photo.jpg                       → "loose" photo in wedding category
 *   public/images/wedding/snehal-rahul/01.jpg             → album "snehal-rahul" loose photo
 *   public/images/wedding/snehal-rahul/haldi/01.jpg       → event "haldi" photo inside album
 *
 * Run manually:   node scripts/generate-image-manifest.mjs
 * Run via npm:    npm run images:manifest
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
      const albumData = { photos: [], events: {} };

      for (const albumEntry of readdirSync(entryPath)) {
        const albumEntryPath = join(entryPath, albumEntry);

        if (statSync(albumEntryPath).isDirectory()) {
          // This is an EVENT sub-directory (e.g. haldi, wedding)
          const eventPhotos = readdirSync(albumEntryPath)
            .filter((f) => VALID.test(f))
            .sort()
            .map((f) => `/images/${catName}/${entry}/${albumEntry}/${f}`);

          if (eventPhotos.length) {
            albumData.events[albumEntry] = eventPhotos;
            total += eventPhotos.length;
          }
        } else if (VALID.test(albumEntry)) {
          // Loose image inside the album directory
          albumData.photos.push(`/images/${catName}/${entry}/${albumEntry}`);
          total++;
        }
      }

      albumData.photos.sort();

      if (albumData.photos.length || Object.keys(albumData.events).length) {
        albums[entry] = albumData;
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
  let albumCount = Object.keys(data.albums).length;
  let albumPhotos = 0;
  for (const album of Object.values(data.albums)) {
    albumPhotos += album.photos.length;
    for (const ev of Object.values(album.events)) {
      albumPhotos += ev.length;
    }
  }
  console.log(`    ${cat}: ${data.loose.length} loose, ${albumCount} albums (${albumPhotos} photos)`);
}
