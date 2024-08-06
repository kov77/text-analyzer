import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './FullScreenLoader.module.scss';

const FullScreenLoader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default FullScreenLoader;
