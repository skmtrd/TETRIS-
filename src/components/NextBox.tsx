import styles from '../styles/index.module.css';
import React from 'react';
type Prop = {
  nextBlockBoard: number[][];
  colors: string[][];
};

const NextBox: React.FC<Prop> = ({ nextBlockBoard, colors }) => {
  return (
    <div className={styles.informationBoardBox}>
      {nextBlockBoard.map((row, y) =>
        row.map((cell, x) => (
          <div
            className={styles.nextBlockCell}
            key={`${x}-${y}`}
            style={{
              backgroundColor:
                nextBlockBoard[y][x] === 0 ? '#161616' : colors[nextBlockBoard[y][x] % 10][0],
              borderColor:
                nextBlockBoard[y][x] === 0
                  ? '#ffffff'
                  : 'rgba(255, 255, 255, 0.514) rgba(0,0,0, 0.253)rgba(0,0,0, 0.253) rgba(255, 255, 255, 0.514)',
              borderWidth: nextBlockBoard[y][x] === 0 ? 0 : 3,
            }}
          />
        )),
      )}
    </div>
  );
};

export default NextBox;
