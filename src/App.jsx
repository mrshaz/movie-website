import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-netflix-dark text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
