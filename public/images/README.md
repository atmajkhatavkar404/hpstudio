# HP Studio Image Library

Drop your photos into the right subfolder. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`.

```
public/images/
  wedding/         ← wedding day photos
  pre-wedding/     ← pre-wedding / engagement shoots
  baby/            ← baby & maternity shoots
  events/          ← event coverage
  commercial/      ← commercial / cafe / product
  team/            ← team headshots (used internally)
```

## After adding images

Run **once** from the project root to refresh the manifest:

```bash
bun run images:manifest
```

This regenerates `public/images/manifest.json`, which the site reads at runtime.
You only need to re-run this when files are **added, removed, or renamed**.

## Notes

- The Portfolio page shows a limited number of highlights per category (configurable
  in `src/lib/images.ts`), so it stays fast even with thousands of images.
- File names within a category are sorted alphabetically — prefix with `001-`, `002-`
  if you want a specific order, or use date prefixes like `2024-03-15-...`.
- Keep individual files reasonably sized (ideally < 500 KB) — large originals will
  slow page loads. Consider exporting at ~1600px wide for web.
