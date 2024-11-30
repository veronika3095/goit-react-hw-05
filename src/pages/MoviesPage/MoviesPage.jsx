/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList'; 
import styles from './MoviesPage.module.css';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDk3ZWE4NDJhNGFkYWUzYzg1OWNjZjQyYjczODU3NyIsIm5iZiI6MTczMjg4NjUzMy44Niwic3ViIjoiNjc0O WMwMDViM2QzZWI5MzNiYTI1YzQwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ugqrCzp0YXVcQN8KaAhEo6-KSW_rp9OtnPV9u_HvCDU'; 
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
    if (!query.trim()) {
      setError('Please enter a movie name');
      return;
    }
    setLoading(true);
    setError('');
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

      <MovieList movies={movies} />  
    </div>
  );
}

export default MoviesPage;