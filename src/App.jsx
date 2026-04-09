import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './components/Header.jsx';
import CinematicHome from './pages/CinematicHome.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  useEffect(() => {
    if (prev.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      prev.current = pathname;
    }
  }, [pathname]);
  return null;
}

/**
 * Renders the appropriate layout based on the current route.
 * The cinematic landing page (/) has its own HUD and does not use the
 * standard Header; all other routes use the regular Header.
 */
function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      {isHome ? (
        /* ── Cinematic landing – full-screen, no outer chrome ── */
        <CinematicHome key={location.key} />
      ) : (
        /* ── Standard pages – with Header ──────────────────── */
        <div className="min-h-screen bg-netflix-dark text-white">
          <Header />
          <main key={location.key} className="page-transition">
            <Routes>
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

