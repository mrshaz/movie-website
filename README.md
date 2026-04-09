# 🎬 MovieDB – Netflix-Style Movie Discovery App

A responsive, dark-themed movie discovery web app built with **React 18**, **Vite**, **React Router v6**, **Axios**, and **Tailwind CSS**. Data is powered by the [TMDB API](https://www.themoviedb.org/documentation/api).

## Features

- 🏠 **Home page** – cinematic hero section + trending grid + scroll-triggered sections
- 🔍 **Search** – find movies by title with results count
- 🎥 **Movie details** – poster, backdrop, genres, rating, release date, runtime, overview, director & cast
- ⏳ **Loading & error states** on every page
- 📱 **Fully responsive** dark design (mobile → desktop)

## UI/UX Highlights

- 🖱️ **Movie card hover effects** – poster zooms in smoothly; an overlay reveals title, rating, year and a "View Details" CTA on hover.
- 📜 **Scroll-triggered sections** – the **Top Rated** and **Coming Soon** sections on the Home page are loaded lazily with `IntersectionObserver`. Skeleton shimmer cards are shown while data fetches.
- 🎨 **Sticky smart header** – the header transitions from a transparent gradient to a solid blurred backdrop once the user scrolls past the hero.
- ✨ **Page fade transitions** – navigating between pages triggers a subtle fade-in animation.
- ♿ **Reduced-motion support** – all animations and transitions are disabled when the user's OS has `prefers-reduced-motion: reduce` enabled.

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 4 |
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
    ├── App.jsx             # Router setup + page fade transition
    ├── index.css           # Tailwind directives + global styles
    ├── hooks/
    │   └── useIntersectionObserver.js  # One-shot scroll detection hook
    ├── services/
    │   └── tmdbApi.js      # Axios TMDB API helpers
    ├── components/
    │   ├── Header.jsx       # Scroll-aware sticky header
    │   ├── MovieCard.jsx    # Hover-zoom card with info overlay
    │   ├── MovieGrid.jsx    # Responsive movie grid with section heading
    │   ├── Section.jsx      # Scroll-triggered lazy section with skeletons
    │   ├── SkeletonCard.jsx # Shimmer placeholder card
    │   ├── SearchBar.jsx
    │   ├── LoadingSpinner.jsx
    │   └── ErrorMessage.jsx
    └── pages/
        ├── HomePage.jsx        # Hero + Trending + Top Rated + Coming Soon
        ├── MovieDetailPage.jsx
        └── SearchResultsPage.jsx
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TMDB_API_KEY` | Your TMDB v3 API key |

> ⚠️ Never commit `.env.local` — it is in `.gitignore`.
