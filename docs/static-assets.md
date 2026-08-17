# Static assets

Everything served as-is lives under `public/`, matching the layout in
`Nextjs_application_best_practices.md`. Files here are addressed by URL from the
site root — `public/images/decor/star.webp` is `/images/decor/star.webp`.

```text
public/
├── images/          raster and illustration art, one folder per area
│   └── decor/       decorative art placed in section backgrounds
├── icons/           standalone icon files served by URL
└── videos/          video sources and their poster frames
```

Add an area folder rather than a loose file at the top of `images/`: `work/` for
project shots, `team/` for portraits, and so on. Create `icons/` and `videos/`
when the first file needs them.

## Naming

Lowercase kebab-case describing the subject, no size or state suffixes:
`star.webp`, `paper-plane.webp`, `northbeam-cover.webp`. Leave dimensions out of
the name — `next/image` resizes, so a name like `star-512.webp` goes stale the
moment the source is replaced.

## Images

Use `next/image` rather than `<img>`, and pass the source file's true `width` and
`height` so the layout reserves the right space before it loads. Add `sizes`
whenever the rendered width is a percentage rather than fixed, so the browser
can pick a smaller file on small screens. Decorative art takes `alt=""`, which
keeps it out of the accessibility tree.

Prefer WebP or AVIF over PNG for photographs and 3D renders. `priority` belongs
only on images genuinely above the fold — everything else should lazy-load,
which is the default.

## Fonts

Fonts do **not** belong here. They are loaded through `next/font` in
`src/config/fonts.ts`, which self-hosts them and avoids a runtime request.
