# 🎬 MovieDB – Netflix-Style Movie Discovery App

A responsive, dark-themed movie discovery web app built with **React 18**, **Vite**, **React Router v6**, **Axios**, and **Tailwind CSS**. Data is powered by the [TMDB API](https://www.themoviedb.org/documentation/api).

## Features

- 🏠 **Home page** – trending movies hero section + grid
- 🔍 **Search** – find movies by title with results count
- 🎥 **Movie details** – poster, backdrop, genres, rating, release date, runtime, overview, director & cast
- ⏳ **Loading & error states** on every page
- 📱 **Fully responsive** dark Netflix-like design

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 4 |
| React Router DOM | 6 |
| Axios | 1 |
| Tailwind CSS | 3 |

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
    ├── App.jsx             # Router setup
    ├── index.css           # Tailwind directives
    ├── services/
    │   └── tmdbApi.js      # Axios TMDB API helpers
    ├── components/
    │   ├── Header.jsx
    │   ├── MovieCard.jsx
    │   ├── MovieGrid.jsx
    │   ├── SearchBar.jsx
    │   ├── LoadingSpinner.jsx
    │   └── ErrorMessage.jsx
    └── pages/
        ├── HomePage.jsx
        ├── MovieDetailPage.jsx
        └── SearchResultsPage.jsx
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TMDB_API_KEY` | Your TMDB v3 API key |

> ⚠️ Never commit `.env.local` — it is in `.gitignore`. 
