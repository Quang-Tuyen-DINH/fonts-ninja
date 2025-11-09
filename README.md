<div align="center">

# Fonts Library

An SSR font catalogue built with Next.js App Router. Browse font families across paginated pages, view rich details (pangram & alphabet previews), and toggle light/dark theme with persistent cookies.

</div>

## Tech Stack

- Next.js (App Router, React 18)
- TypeScript
- SCSS Modules + CSS Variables (theming)
- `next/font` (Inter + Geist)
- Server Components with selective Client Components (ThemeToggle, PreviewSwitcher)

## Features

- Server‑side rendered paginated font families (3 pages of mock data)
- Font details page with pangram / alphabet switcher
- Theme toggle (cookie persisted, no flicker fallback strategy)
- Lazy SVG tinting via `currentColor`
- Shared cached data layer for families & details lookup
- Accessible pagination (aria-current, disabled states)
- Deterministic theming with root `data-theme`

## Table of Contents

* Getting Started
	* Clone
	* Install
	* Run Dev
* Project Structure
* Data & API Layer
* Usage Guide
	* Catalogue
	* Font Details
* Theming
* Future Improvements

## Getting Started

### Clone
```bash
git clone https://github.com/Quang-Tuyen-DINH/fonts-ninja.git
cd fonts-ninja
```

### Install
```bash
npm install
```

### Run Dev
```bash
npm run dev
```

Visit http://localhost:3000.

## Project Structure
```bash
root/
├─ public/
├─ src/
│  ├─ app/              # Next.js App Router: layout, pages & routes
│  │  ├─ api/           # Route handlers for families & details
│  │  ├─ font/[id]/     # Dynamic font detail page + switcher
│  ├─ components/       # Reusable UI components (Card, Pagination, NavBar)
│  ├─ data/             # Mock JSON datasets
│  ├─ lib/              # Data loaders, theme utilities, svg helpers
│  ├─ types/            # TypeScript type definitions
├─ eslint.config.mjs    # ESLint configuration
├─ tsconfig.json        # TypeScript configuration
├─ package.json
```

## Data & API Layer

Mock JSON files provide deterministic font family data across three pages plus an optional single details record. A cached index flattens pages for O(1) lookup by id.

Key functions in `src/lib/data.ts`:
* `loadFamiliesPage(page)` – loads a single paginated JSON file.
* `getFamilyById(id)` – cached map lookup across all pages + single details file.

Route handlers in `src/app/api/families/route.ts`:
* `listFamilies` – returns current page, totalPages, families, totalFamilies.
* `getFamily` – returns a single family by query param `id`.

## Usage Guide

### Catalogue (Home Page)
Landing page lists font families for page 1; pagination allows navigating pages 1–3. Cards lazy-load their SVG preview and inherit color from theme.

### Font Details
`/font/[id]` displays a chosen family with two preview modes: Pangram and Alphabet. The client-side `PreviewSwitcher` preserves accessibility state (`aria-selected`). Metadata is generated server-side from the same data loader for consistency.

## Theming

Light/Dark mode is driven by `data-theme` on `<html>` and a cookie (`fonts_app_theme`). Variables (background, foreground, accent, muted) reside in `globals.css`. The `ThemeToggle` client component updates cookie + DOM without layout shift.

## Author

Quang Tuyen DINH
