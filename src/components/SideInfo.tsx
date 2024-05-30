import styles from '../pages/index.module.css';
import React from 'react';

import NextBox from './NextBox';
import UserGuide from './UserGuide';
import Buttons from './Buttons';
type Prop = {
  nextBlockBoard: number[][];
  touchControlHandler: (num: number) => void;
  isActive: boolean;
  colors: string[][];
};

const SideInfo: React.FC<Prop> = ({ nextBlockBoard, touchControlHandler, isActive, colors }) => {
  return (
    <div className={styles.informationBoard}>
      <NextBox nextBlockBoard={nextBlockBoard} colors={colors} />
      <UserGuide />
      <Buttons touchControlHandler={touchControlHandler} isActive={isActive} />
    </div>
  );
};

export default SideInfo;
