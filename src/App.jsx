import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
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

function AnimatedRoutes() {
  const { key } = useLocation();
  return (
    <main key={key} className="page-transition">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-netflix-dark text-white">
        <Header />
        <ScrollToTop />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

