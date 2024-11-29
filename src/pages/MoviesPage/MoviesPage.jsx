import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const API_KEY = '9497ea842a4adae3c859ccf42b738577';
const API_URL = 'https://api.themoviedb.org/3';

export function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = () => {
    axios
      .get(`${API_URL}/search/movie?query=${query}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(response => setMovies(response.data.results))
      .catch(error => console.error('Error searching movies:', error));
  };

  return (
    <div className={styles.moviesPage}>
      <input
        type="text"
        placeholder="Search for a movie"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>Search</button>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;