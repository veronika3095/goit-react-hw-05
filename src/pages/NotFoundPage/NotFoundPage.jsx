/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1>Page Not Found</h1>
      <Link to="/">Go to HomePage</Link>
    </div>
  );
};

export default NotFoundPage;