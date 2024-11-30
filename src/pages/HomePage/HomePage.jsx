/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css'; 

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDk3ZWE4NDJhNGFkYWUzYzg1OWNjZjQyYjczODU3NyIsIm5iZiI6MTczMjg4NjUzMy44Niwic3ViIjoiNjc0O WMwMDViM2QzZWI5MzNiYTI1YzQwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ugqrCzp0YXVcQN8KaAhEo6-KSW_rp9OtnPV9u_HvCDU';
const API_URL = 'https://api.themoviedb.org/3';

export function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/trending/movie/day`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(response => setMovies(response.data.results))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className={styles.homePage}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;