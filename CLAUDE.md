# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build to /dist
npm run lint      # ESLint across all JS/JSX files
npm run preview   # Serve the /dist build locally
node generate-icons.js  # Regenerate PWA icons from public/icon.svg
```

No test framework is configured.

## Architecture

A single-page React 19 PWA — no routing, no backend, no API calls. All data (quotes, translations) is bundled at build time. User preferences persist in `localStorage` (`ui-theme`, `ui-language`).

**Stack:** React 19 + Vite 7, Tailwind CSS v4 (class-based dark mode), CVA for variant components, next-themes for theme context, vite-plugin-pwa + Workbox for offline/installability.

**Component tree:**

```
main.jsx
└── ThemeProvider          (next-themes, persists to localStorage)
    └── LanguageProvider   (custom context, persists to localStorage)
        └── App            (shell: page state + top nav + bottom toggles)
            ├── HomePage   (2-person turn, purple/pink/cyan gradient)
            └── CarPage    (3-person turn, cool blue/slate gradient)
```

**Navigation** is state-based (no router). `App.jsx` holds a `page` state (`'home'` | `'car'`) and renders a top-center frosted pill with a Home icon and a Car icon (Lucide). The active icon is highlighted.

**Page logic — `src/pages/HomePage.jsx`:**
- Turn calculation: days since 2025-01-01 (`Asia/Kuala_Lumpur`) mod 2. Day 0 = Hayfa Izara, Day 1 = Hafiya Inara.

**Page logic — `src/pages/CarPage.jsx`:**
- Turn calculation: days since 2025-01-01 (`Asia/Kuala_Lumpur`) mod 3. Day 0 = Hayfa Izara, Day 1 = Hafiya Inara, Day 2 = Hail Idlan.
- Cool blue/slate gradient: `sky-100 → blue-200 → slate-300` (light), `slate-950 → blue-950 → sky-900` (dark).

**Shared helpers in `src/lib/utils.js`:**
- `getMalaysiaDate()` — returns current date object in `Asia/Kuala_Lumpur` timezone; used by both pages.

**Daily quote** (both pages): selected by day-of-year index cycling through 100+ entries in `src/lib/quotes.js`. All dates computed in `Asia/Kuala_Lumpur` timezone regardless of user locale.

**i18n:** Two languages (English `en`, Malay `ms`) via `LanguageProvider`. UI strings live in `src/lib/translations.js`; bilingual quotes are in `src/lib/quotes.js`.

**Tailwind dark mode** uses the `class` strategy — the ThemeProvider toggles `dark` on `<html>`. Use `dark:` prefixes for dark-mode variants.

**UI components** in `src/components/ui/` (Button, Card) are CVA-based; new variants should follow that pattern using `class-variance-authority`.

**ESLint** uses the flat config format (ESLint 9). `no-unused-vars` is configured to ignore uppercase-prefixed and underscore-prefixed names.
