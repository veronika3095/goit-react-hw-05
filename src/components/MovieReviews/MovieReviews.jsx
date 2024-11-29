import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const API_KEY = '9497ea842a4adae3c859ccf42b738577';
const API_URL = 'https://api.themoviedb.org/3';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/movie/${movieId}/reviews`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(response => setReviews(response.data.results))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
}