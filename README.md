# harrison-build

Classic desktop-style personal site rebuilt from an old Replit prototype.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Builds both the app and SEO blog pages.

## Blog

Generate static SEO blog pages + `sitemap.xml` + `rss.xml`:

```bash
npm run blog:build
```

## Keep Journal Fresh

Sync latest markdown notes from `/Users/harrison/work`:

```bash
npm run sync:journal
```

Session-start sync (optional auto-push to GitHub):

```bash
AUTO_PUSH=1 npm run session:start
```

Live watch mode (sync on file changes in `/Users/harrison/work`):

```bash
AUTO_PUSH=1 npm run watch:work
```

## Analytics

The site logs lightweight interaction events to `localStorage` under `hb_events`.
If Plausible is loaded on the page (`window.plausible`), events are also emitted there.

Traffic tracking is wired with:

```html
<script defer data-domain="harrison.build" src="https://plausible.io/js/script.js"></script>
```

To activate reporting:
1. Create a Plausible site for `harrison.build`.
2. Verify the domain in Plausible.
3. Deploy this repo; pageviews and custom `window.plausible(...)` events will appear in Plausible.
