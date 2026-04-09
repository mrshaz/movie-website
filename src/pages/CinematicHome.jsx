import { useEffect, useState } from 'react';
import {
  getTrending,
  getTopRated,
  getUpcoming,
  getMovieDetails,
} from '../services/tmdbApi.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useSectionScroll from '../hooks/useSectionScroll.js';
import CinematicHud from '../components/cinematic/CinematicHud.jsx';
import HeroSection from '../components/cinematic/HeroSection.jsx';
import PosterField from '../components/cinematic/PosterField.jsx';
import MovieRail from '../components/cinematic/MovieRail.jsx';
import SpotlightReveal from '../components/cinematic/SpotlightReveal.jsx';
import ArchiveGrid from '../components/cinematic/ArchiveGrid.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const SECTION_COUNT = 5;

export default function CinematicHome() {
  const reducedMotion = useReducedMotion();
  const { activeSection, goToSection } = useSectionScroll({ count: SECTION_COUNT });

  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [spotlight, setSpotlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Lock body scroll so the cinematic wheel handler is the only one active */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Fetch all data up front */
  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([getTrending(), getTopRated(), getUpcoming()])
      .then(async ([trendRes, topRes, upRes]) => {
        const trendMovies = trendRes.data.results ?? [];
        const topMovies = topRes.data.results ?? [];
        const upMovies = upRes.data.results ?? [];

        setTrending(trendMovies);
        setTopRated(topMovies);
        setUpcoming(upMovies);

        /* Fetch full details for the spotlight movie (top-rated[1] – the second
           entry gives more variety since the hero already highlights trending[0]).
           Falls back gracefully if the extra request fails. */
        const SPOTLIGHT_INDEX = 1;
        const spotlightSrc = topMovies[SPOTLIGHT_INDEX] ?? topMovies[0];
        if (spotlightSrc) {
          try {
            const { data } = await getMovieDetails(spotlightSrc.id);
            setSpotlight(data);
          } catch {
            setSpotlight(spotlightSrc);
          }
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load movies.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner message="Loading cinematic experience…" />;
  if (error) return <ErrorMessage message={error} />;

  const hero = trending[0] ?? null;

  /* Translate to the active section without browser scroll */
  const translateY = reducedMotion ? 0 : activeSection * 100;

  return (
    <div className="relative h-screen overflow-hidden bg-netflix-dark">
      {/* ── Scanlines + Noise overlay ────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-40 scanlines"
        aria-hidden="true"
      />

      {/* ── Sections container ───────────────────────────── */}
      <div
        className={reducedMotion ? '' : 'transition-transform duration-700 ease-in-out'}
        style={{ transform: `translateY(-${translateY}vh)` }}
      >
        {/* S0 – Hero */}
        <HeroSection
          movie={hero}
          isActive={activeSection === 0}
          reducedMotion={reducedMotion}
        />

        {/* S1 – Poster Field (Trending) */}
        <PosterField
          movies={trending}
          isActive={activeSection === 1}
          reducedMotion={reducedMotion}
        />

        {/* S2 – Movie Rail (Top Rated) */}
        <MovieRail
          movies={topRated}
          isActive={activeSection === 2}
          reducedMotion={reducedMotion}
        />

        {/* S3 – Spotlight Reveal */}
        <SpotlightReveal
          movie={spotlight}
          isActive={activeSection === 3}
          reducedMotion={reducedMotion}
        />

        {/* S4 – Archive Grid (Upcoming) */}
        <ArchiveGrid
          movies={upcoming}
          isActive={activeSection === 4}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* ── HUD overlay ──────────────────────────────────── */}
      <CinematicHud
        activeSection={activeSection}
        sectionCount={SECTION_COUNT}
        onNavigate={goToSection}
      />
    </div>
  );
}
