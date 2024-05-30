import styles from '../pages/index.module.css';
import React from 'react';

const UserGuide = () => {
  return (
    <div className={styles.userGuideBase}>
      <div className={styles.userGuide}>
        <div className={styles.userGuideText} style={{ fontWeight: 'bold', fontSize: 17 }}>
          Guide
        </div>
        <div className={styles.userGuideText}>Left : ←</div>
        <div className={styles.userGuideText}>Right : →</div>
        <div className={styles.userGuideText}>Rotate : ↑</div>
        <div className={styles.userGuideText}>Drop : ↓</div>
        <div className={styles.userGuideText}>Hard D : space</div>
        <div className={styles.userGuideText}>Restart : R</div>
        <div className={styles.userGuideText} />
      </div>
    </div>
  );
};

export default UserGuide;
