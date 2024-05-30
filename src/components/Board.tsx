import styles from '../pages/index.module.css';
import React from 'react';
import { motion } from 'framer-motion';

type Prop = {
  board: number[][];
  isActive: boolean;
  colors: string[][];
};

const Board: React.FC<Prop> = ({ board, isActive, colors }) => {
  return (
    <>
      <div className={styles.curtain} style={{ visibility: isActive ? 'hidden' : 'visible' }}>
        Press Start or Enter Key
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <>
              <motion.div
                className={styles.cell}
                key={`${x}-${y}`}
                style={{
                  backgroundColor: board[y][x] === 0 ? '#0a0a0a' : colors[board[y][x] % 10][0],
                  borderColor:
                    board[y][x] === 0
                      ? '#1a1a1a'
                      : 'rgba(255, 255, 255, 0.514) rgba(0,0,0, 0.253)rgba(0,0,0, 0.253) rgba(255, 255, 255, 0.514)',
                  borderWidth: board[y][x] === 0 ? 1 : 4,
                  borderRadius: board[y][x] === 0 ? 0 : 3,
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: board[y].every((cell) => cell !== 0) ? 0 : 1,
                }}
                transition={{ duration: 1.2 }}
              />
            </>
          )),
        )}
      </div>
    </>
  );
};

export default Board;
