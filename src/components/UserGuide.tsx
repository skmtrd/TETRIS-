import styles from '../styles/index.module.css';
import React from 'react';

const userGuideText = [
  'Left : ←',
  'Right : →',
  'Rotate : ↑',
  'Drop : ↓',
  'Hard D : space',
  'Restart : R',
];

const UserGuide = () => {
  return (
    <div className={styles.userGuideBase}>
      <div className={styles.userGuide}>
        <div className={styles.userGuideText} style={{ fontWeight: 'bold', fontSize: 17 }}>
          Guide
        </div>
        {userGuideText.map((text, index) => (
          <div className={styles.userGuideText} key={index}>
            {text}
          </div>
        ))}
        <div className={styles.userGuideText} />
      </div>
    </div>
  );
};

export default UserGuide;
