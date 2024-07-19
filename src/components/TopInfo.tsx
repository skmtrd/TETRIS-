import styles from '../styles/index.module.css';
import React from 'react';
type Prop = {
  removeLine: number;
};

const TopInfo: React.FC<Prop> = ({ removeLine }) => {
  return (
    <div className={styles.topInformation}>
      <div className={styles.strings}>Level : {Math.floor(removeLine / 10 + 1)}</div>
      <div className={styles.strings}>Remove : {removeLine}</div>
    </div>
  );
};

export default TopInfo;
