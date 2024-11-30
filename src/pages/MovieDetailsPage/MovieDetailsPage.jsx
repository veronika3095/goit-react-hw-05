/* eslint-disable no-unused-vars */
import { useParams, Link, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const API_KEY = '9497ea842a4adae3c859ccf42b738577';
const API_URL = 'https://api.themoviedb.org/3';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      })
      .then(response => {
        setMovieDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching movie details.');
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.movieDetails}>
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className={styles.moviePoster}
      />
      <p>{movieDetails.overview}</p>

      <div className={styles.additionalInfo}>
        <h3>More Information</h3>
        <Link to="cast">View Cast</Link> | <Link to="reviews">View Reviews</Link>
      </div>

      <Outlet /> {}
    </div>
  );
}