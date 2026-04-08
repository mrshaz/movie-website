import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const getBackdropUrl = (path, size = 'original') =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const getTrending = (timeWindow = 'week') =>
  api.get(`/trending/movie/${timeWindow}`);

export const searchMovies = (query, page = 1) =>
  api.get('/search/movie', { params: { query, page } });

export const getMovieDetails = (id) =>
  api.get(`/movie/${id}`);

export const getMovieCredits = (id) =>
  api.get(`/movie/${id}/credits`);

export default api;
