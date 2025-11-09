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

Mock JSON files live under `src/data`. The app exposes two API routes and fetches them server-side from pages:

- `GET /api/families?page={n}` → returns families for a given page JSON (as provided by the test data).
- `GET /api/familyDetails` → returns a single family record from `fontDetails.json`.

Server pages call these endpoints using an absolute base URL built via a small helper in `src/lib/url.ts`:

```ts
// src/lib/url.ts
import { headers } from 'next/headers';
export async function getBaseUrl() {
	const h = await headers();
	const host = h.get('host');
	const proto = h.get('x-forwarded-proto') ?? 'http';
	return host ? `${proto}://${host}` : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
}
```

## Usage Guide

### Catalogue (Home Page)
The home page fetches `GET /api/families?page={n}` on the server and renders a paginated grid (max 24 per page as per provided JSON). Cards lazy-load their SVG preview and inherit color from the current theme.

### Font Details
`/font/[id]` fetches `GET /api/familyDetails` on the server and displays two preview modes: Pangram (default when available) and Alphabet. The client `PreviewSwitcher` preserves accessibility state (`aria-selected`). Metadata is generated server-side from the same API for consistency.

## Theming

Light/Dark mode is driven by `data-theme` on `<html>` and a cookie (`fonts_app_theme`). Variables (background, foreground, accent, muted) reside in `globals.css`. The `ThemeToggle` client component updates cookie + DOM without layout shift.

## Technical Choices (short)

- Server-side fetch from internal API routes (instead of importing JSON directly in pages) to mirror real-world boundaries and satisfy the test requirement.
- SCSS Modules + CSS variables for a simple, deterministic light/dark system with `currentColor`-based SVG tinting.
- Minimal helpers (`getBaseUrl`) to build absolute URLs reliably in server components.

## Author

Quang Tuyen DINH
