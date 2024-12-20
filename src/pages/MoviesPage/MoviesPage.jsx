/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList'; 
import styles from './MoviesPage.module.css';

const API_KEY = '9497ea842a4adae3c859ccf42b738577'; 
const API_URL = 'https://api.themoviedb.org/3';

export function MoviesPage() {
  const [query, setQuery] = useState('');  
  const [movies, setMovies] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState('');  

  const fetchMovies = (query) => {
    return axios.get(`${API_URL}/search/movie`, {
      params: {
        query,  
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMovies([]);  
    fetchMovies(query)
      .then(response => {
        setMovies(response.data.results); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError('Something went wrong while fetching the movies.');
        setLoading(false);
      });
  };

  return (
    <div className={styles.moviesPage}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}  
      {error && <p>{error}</p>} 

      {}
      {!loading && !error && query && movies.length === 0 && (
        <p>No movies found.</p>
      )}

      <MovieList movies={movies} />  
    </div>
  );
}

export default MoviesPage;