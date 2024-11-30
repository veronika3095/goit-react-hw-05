/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDk3ZWE4NDJhNGFkYWUzYzg1OWNjZjQyYjczODU3NyIsIm5iZiI6MTczMjg4NjUzMy44Niwic3ViIjoiNjc0O WMwMDViM2QzZWI5MzNiYTI1YzQwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ugqrCzp0YXVcQN8KaAhEo6-KSW_rp9OtnPV9u_HvCDU';
const API_URL = 'https://api.themoviedb.org/3';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/movie/${movieId}/reviews`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(response => {
        setReviews(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setError('Error fetching reviews.');
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.reviews}>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>{review.content}</li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
}