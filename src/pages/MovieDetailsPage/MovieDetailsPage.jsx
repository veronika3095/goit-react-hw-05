/* eslint-disable no-unused-vars */
import { useParams, Link, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDk3ZWE4NDJhNGFkYWUzYzg1OWNjZjQyYjczODU3NyIsIm5iZiI6MTczMjg4NjUzMy44Niwic3ViIjoiNjc0O WMwMDViM2QzZWI5MzNiYTI1YzQwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ugqrCzp0YXVcQN8KaAhEo6-KSW_rp9OtnPV9u_HvCDU';
const API_URL = 'https://api.themoviedb.org/3';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/movie/${movieId}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(response => setMovieDetails(response.data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieId]);

  if (!movieDetails) return <div>Loading movie details...</div>;

  return (
    <div className={styles.movieDetails}>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className={styles.moviePoster}
      />
      <p>{movieDetails.overview}</p>
      <Link to="cast">View Cast</Link>
      <Link to="reviews">View Reviews</Link>
      <Outlet />
    </div>
  );
}