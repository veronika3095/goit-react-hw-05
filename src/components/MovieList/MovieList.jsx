/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation(); 

  return (
    <ul className={styles.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.movieItem}>
          
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.movieImage}
            />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;



