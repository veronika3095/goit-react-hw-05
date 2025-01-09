import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom'; 
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=9497ea842a4adae3c859ccf42b738577&language=en-US`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  
  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from); 
    } else {
      navigate(-1);  
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetails}>
      <button onClick={handleBack} className={styles.backButton}>Back</button>
      
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

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;