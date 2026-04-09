# 🎬 MovieDB – Cinematic Movie Discovery App

A responsive, dark-themed movie discovery web app built with **React 18**, **Vite**, **React Router v6**, **Axios**, and **Tailwind CSS**. Data is powered by the [TMDB API](https://www.themoviedb.org/documentation/api).

## ✨ New: Cinematic Landing Experience

The default landing page (`/`) is now a **scroll-driven cinematic experience** inspired by movie HUD interfaces:

| Section | Content |
|---------|---------|
| **S0 – Intro / Hero** | Full-viewport hero showcasing the top trending movie with backdrop, title and CTA |
| **S1 – Trending Poster Field** | 15 trending movie posters in a responsive grid; hover to zoom + reveal overlay |
| **S2 – Top Rated Rail** | Horizontally draggable (mouse-drag / touch-scroll) rail of top-rated films |
| **S3 – Spotlight Reveal** | Cinematic spotlight on a curated top-rated movie with tagline, genres & runtime |
| **S4 – Archive Grid** | Upcoming-releases grid with hover-zoom and accent highlight |

### Interaction model
- **Mouse wheel / keyboard (↑↓ / PgUp PgDn)** – navigate between sections (throttled to one transition per ~900 ms).
- **Touch swipe** – swipe up/down to advance sections on mobile.
- **HUD dot navigation** – click the pill/dot nav in the header or the side dots on mobile.
- **Progress bar** – thin red bar at the very top tracks which section you are on.
- **Scanlines & film grain** – subtle CSS overlay for cinematic atmosphere (disabled for `prefers-reduced-motion`).
- All movie cards link directly to the existing Movie Details page; search is always accessible in the HUD header.

### Known limitations
- The section-scroll captures the browser wheel event on the landing page; normal page scrolling is restored when navigating to Search or Movie Details.
- Reduced-motion users see instant transitions (no slide animation) and no scanlines/noise overlay.
- The Spotlight section fetches full movie details for one film (extra API call) to obtain tagline/genres/runtime.

## Features

- 🎞️ **Cinematic landing** – scroll-section HUD experience (see above)
- 🔍 **Search** – find movies by title with results count
- 🎥 **Movie details** – poster, backdrop, genres, rating, release date, runtime, overview, director & cast
- ⏳ **Loading & error states** on every page
- 📱 **Fully responsive** dark design (mobile → desktop)

## UI/UX Highlights

- 🖱️ **Movie card hover effects** – poster zooms in smoothly; an overlay reveals title, rating, year and a "View Details" CTA on hover.
- 🎨 **Cinematic HUD** – fixed overlay with progress bar, logo, dot navigation and search; updates with the active section.
- 📺 **Scanlines / film grain** – subtle CSS noise/scanline overlay on the landing page for atmosphere.
- ✨ **Page fade transitions** – navigating between non-home pages triggers a subtle fade-in animation.
- ♿ **Reduced-motion support** – all animations, transitions and overlays are disabled/minimised when `prefers-reduced-motion: reduce` is set.

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 8 |
| React Router DOM | 6 |
| Axios | 1 |
| Tailwind CSS | 3 |

> No extra animation libraries were added. All effects are implemented with Tailwind utility classes and native CSS animations.

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mrshaz/movie-website.git
cd movie-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> Get a free API key at https://www.themoviedb.org/settings/api

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
movie-website/
├── index.html              # Vite entry point
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example            # Copy to .env.local and add your key
└── src/
    ├── main.jsx            # React 18 root render
    ├── App.jsx             # Router setup – cinematic home vs standard layout
    ├── index.css           # Tailwind directives + global styles + scanlines
    ├── hooks/
    │   ├── useReducedMotion.js         # prefers-reduced-motion hook
    │   ├── useSectionScroll.js         # Wheel/touch section navigation hook
    │   └── useIntersectionObserver.js  # One-shot scroll detection hook
    ├── services/
    │   └── tmdbApi.js      # Axios TMDB API helpers
    ├── components/
    │   ├── cinematic/
    │   │   ├── CinematicHud.jsx    # Fixed HUD overlay (progress, dots, search)
    │   │   ├── HeroSection.jsx     # S0 – full-viewport hero
    │   │   ├── PosterField.jsx     # S1 – trending poster grid
    │   │   ├── MovieRail.jsx       # S2 – draggable horizontal rail
    │   │   ├── SpotlightReveal.jsx # S3 – single movie cinematic spotlight
    │   │   └── ArchiveGrid.jsx     # S4 – upcoming grid
    │   ├── Header.jsx       # Scroll-aware sticky header (non-home pages)
    │   ├── MovieCard.jsx    # Hover-zoom card with info overlay
    │   ├── MovieGrid.jsx    # Responsive movie grid with section heading
    │   ├── Section.jsx      # Scroll-triggered lazy section with skeletons
    │   ├── SkeletonCard.jsx # Shimmer placeholder card
    │   ├── SearchBar.jsx
    │   ├── LoadingSpinner.jsx
    │   └── ErrorMessage.jsx
    └── pages/
        ├── CinematicHome.jsx   # Default landing – cinematic experience
        ├── HomePage.jsx        # Classic home (kept for reference; no longer the default route)
        ├── MovieDetailPage.jsx
        └── SearchResultsPage.jsx
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TMDB_API_KEY` | Your TMDB v3 API key |

> ⚠️ Never commit `.env.local` — it is in `.gitignore`.
