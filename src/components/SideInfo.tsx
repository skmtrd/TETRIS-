import styles from '../pages/index.module.css';
import React from 'react';
type Prop = {
  nextBlockBoard: number[][];
  touchControlHandler: (num: number) => void;
  isActive: boolean;
  colors: string[][];
};

const SideInfo: React.FC<Prop> = ({ nextBlockBoard, touchControlHandler, isActive, colors }) => {
  return (
    <div className={styles.informationBoard}>
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
      <div className={styles.buttonsBox} style={{ flexFlow: 'column', gap: 15 }}>
        <div className={styles.buttons} onClick={() => touchControlHandler(5)}>
          Restart
        </div>
        <div className={styles.buttons} onClick={() => touchControlHandler(6)}>
          {isActive ? 'Stop' : 'Start'}
        </div>
      </div>
    </div>
  );
};

export default SideInfo;
