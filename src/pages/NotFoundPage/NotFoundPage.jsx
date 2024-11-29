import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <h1>Page Not Found</h1>
      <Link to="/">Go to HomePage</Link>
    </div>
  );
}