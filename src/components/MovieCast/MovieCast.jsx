/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieCast.module.css';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDk3ZWE4NDJhNGFkYWUzYzg1OWNjZjQyYjczODU3NyIsIm5iZiI6MTczMjg4NjUzMy44Niwic3ViIjoiNjc0O WMwMDViM2QzZWI5MzNiYTI1YzQwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ugqrCzp0YXVcQN8KaAhEo6-KSW_rp9OtnPV9u_HvCDU';
const API_URL = 'https://api.themoviedb.org/3';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/movie/${movieId}/credits`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(response => {
        setCast(response.data.cast);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cast:', error);
        setError('Error fetching cast.');
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.cast}>
      <h3>Cast</h3>
      {cast.length > 0 ? (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
}