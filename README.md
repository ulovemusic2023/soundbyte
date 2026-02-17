# SoundByte

Tech intelligence, distilled.

SoundByte is a curated dashboard that aggregates and displays tech insights across three radars: **Music Tech**, **AI Infrastructure**, and **Software Development**. Data is refreshed 6x daily from 30+ sources.

**Live site:** [ulovemusic2023.github.io/soundbyte](https://ulovemusic2023.github.io/soundbyte/)

## Features

- **Fuzzy search** with autocomplete tag suggestions and `⌘K` shortcut
- **Multi-axis filtering** by radar, priority level, and time range
- **Grid & Timeline views** with animated transitions
- **Trends dashboard** — keyword frequency charts, daily activity, hot tags ranking
- **Collections** — save and organize entries into custom groups (persisted to localStorage)
- **Share** — export entries to X, Threads, Facebook, or clipboard
- **Dark / Light mode** with system-preference-aware toggle
- **i18n** — Traditional Chinese (zh-TW) and English

## Tech Stack

- React 19, TypeScript, Vite 7
- Tailwind CSS v4
- Framer Motion (page transitions, staggered entrances, layout animations)
- Fuse.js (fuzzy search)
- Lucide React (icons)

## Development

```bash
npm install
npm run dev       # Start dev server
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

## Data

All entries are served from `public/index.json` at runtime. See `src/types.ts` for the `Entry` and `IndexData` schema.

## License

Built by [uLove Music](https://github.com/ulovemusic2023).
