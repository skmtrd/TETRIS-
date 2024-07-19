import styles from '../styles//index.module.css';
import React from 'react';

type Prop = {
  touchControlHandler: (num: number) => void;
  isActive: boolean;
};

const Buttons: React.FC<Prop> = ({ touchControlHandler, isActive }) => {
  return (
    <div className={styles.buttonsBox} style={{ flexFlow: 'column', gap: 15 }}>
      <div className={styles.buttons} onClick={() => touchControlHandler(5)}>
        Restart
      </div>
      <div className={styles.buttons} onClick={() => touchControlHandler(6)}>
        {isActive ? 'Stop' : 'Start'}
      </div>
    </div>
  );
};

export default Buttons;
