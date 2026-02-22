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
