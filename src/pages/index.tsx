import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import styles from './index.module.css';

import {
  create2DArray,
  generateUniqueList,
  blockFall,
  hardDrop,
  leftMoveBlock,
  rightMoveBlock,
  rotateBlock,
  removeBlocks,
  blocks,
} from '../function';
const Home = () => {
  const [board, setBoard] = useState(create2DArray(20, 10, 0));
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [blockHistory, setBlockHitory] = useState<number[][]>([[], [], []]);
  const nextBlockBoard = create2DArray(4, 4, 0);
  const blockMove = [0, 0, 0, 0, 0, 0];
  const removeLine = board.length - 20;

  const toggleButtonHandler = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const resetButtonHandler = () => {
    setBoard(create2DArray(20, 10, 0));
    setSeconds(0);
    setIsActive(false);
    setBlockHitory([generateUniqueList(), [], [0]]);
  };

  const newBlockMove = structuredClone(blockMove);
  const newBlockHistory: number[][] | undefined = structuredClone(blockHistory);

  const touchControlHandler = (number: number) => {
    switch (number) {
      case 0:
        newBlockMove[4] = 1;
        break;
      case 1:
        newBlockMove[0] = 1;
        break;
      case 2:
        newBlockMove[2] = 1;
        break;
      case 3:
        newBlockMove[1] = 1;
        break;
      case 4:
        newBlockMove[3] = 1;
        break;
      case 5:
        resetButtonHandler();
        break;
      case 6:
        toggleButtonHandler();
        break;
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent) => {
    event.preventDefault();
    const key = event.key;
    switch (key) {
      case 'ArrowLeft':
        newBlockMove[0] = 1;
        break;
      case 'ArrowRight':
        newBlockMove[1] = 1;
        break;
      case 'ArrowDown':
        newBlockMove[2] = 1;
        break;
      case ' ':
        newBlockMove[3] = 1;
        break;
      case 'ArrowUp':
        newBlockMove[4] = 1;
        break;
      case 'Enter':
        toggleButtonHandler();
        break;
      case 'r':
      case 'R':
        resetButtonHandler();
        break;
      default:
        break;
    }
  };

  const rotateTouchHandler = () => {
    newBlockMove[4] = 1;
  };

  const hanlers = useSwipeable({
    preventScrollOnSwipe: true,
    delta: 20,
    trackTouch: true,
    onSwiping: (evenData) => {
      if (evenData.dir === 'Left') {
        touchControlHandler(1);
      } else if (evenData.dir === 'Right') {
        touchControlHandler(3);
      }
    },
    onSwipedLeft: () => touchControlHandler(1),
    onSwipedRight: () => touchControlHandler(3),
    onSwipedDown: () => touchControlHandler(4),
  });

  if (newBlockHistory[0].length === 0) {
    const generatedBlocks = generateUniqueList();
    for (const blocks of generatedBlocks) {
      newBlockHistory[0].push(blocks);
    }
  }
  if (board.flat().filter((cell) => cell === 1 || cell === 2).length !== 0) {
    for (const position of blocks[newBlockHistory[0][0]]) {
      nextBlockBoard[position[0] + 1][position[1] - 3] = 1;
    }
  }

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // ページリロードなどのデフォルト動作をキャンセル
    };

    let interval = null;
    if (isActive) {
      let newBoard = structuredClone(board);
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        if (newBoard.flat().filter((cell) => cell === 1).length === 0) {
          newBlockHistory[2][0] = 0;
          const nextBlockType = newBlockHistory[0].shift();
          nextBlockType !== undefined && newBlockHistory[1].push(nextBlockType);
          if (nextBlockType !== undefined) {
            for (const position of blocks[nextBlockType]) {
              if (newBoard[position[0]][position[1]] === 2) {
                setIsActive(false);
                alert('game over');
                return;
              }
              newBoard[position[0]][position[1]] = 1;
            }
          }
          setBlockHitory(newBlockHistory);
          setBoard(newBoard);
        } else {
          const speed = [20 - Math.floor(removeLine / 10 + 1) * 2];
          if (speed[0] <= 1) {
            speed[0] = 2;
          }
          if (seconds % speed[0] === 0) {
            console.log(speed[0]);
            newBoard = blockFall(newBoard);
          }
          if (newBlockMove[0] === 1) {
            newBoard = leftMoveBlock(newBoard);
          }
          if (newBlockMove[1] === 1) {
            newBoard = rightMoveBlock(newBoard);
          }
          if (newBlockMove[2] === 1) {
            newBoard = blockFall(newBoard);
          }
          if (newBlockMove[3] === 1) {
            const updatedBoard: number[][] | undefined = hardDrop(newBoard);
            if (updatedBoard === undefined) return;
            newBoard = updatedBoard;
          }
          if (newBlockMove[4] === 1) {
            newBlockHistory[2][0]++;
            newBoard = rotateBlock(
              newBoard,
              newBlockHistory[1][newBlockHistory[1].length - 1],
              newBlockHistory[2][0],
            );
          }
          console.log('continue');
          const removedBoard = removeBlocks(newBoard);
          setBoard(removedBoard);
        }
        setBlockHitory(newBlockHistory);
      }, 50);
    } else if (!isActive) {
      if (interval !== null) {
        clearInterval(interval);
      }
    }
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive, board, newBlockMove, seconds, newBlockHistory, nextBlockBoard, removeLine]);

  return (
    <div
      className={styles.container}
      onKeyDown={keyDownHandler}
      tabIndex={0}
      {...hanlers}
      onClick={rotateTouchHandler}
    >
      <div className={styles.base}>
        <div className={styles.topInformation}>
          <div>Level : {Math.floor(removeLine / 10 + 1)}</div>
          <div style={{ marginLeft: 100 }}>remove : {removeLine}</div>
        </div>
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
                    backgroundColor: board[y][x] === 0 ? '#98d7f5' : '#a556ff',
                    borderColor:
                      board[y][x] === 0 ? '#beefff' : ' #cecece  #c69bff  #c69bff #cecece',
                    borderWidth: board[y][x] === 0 ? 1 : 4,
                  }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: board[y].every((cell) => cell !== 0) ? [1, 0, 1, 0] : 1,
                    scale: board[y].every((cell) => cell !== 0) ? 0 : 1,
                  }}
                  transition={{ duration: 0.05 }}
                />
              </>
            )),
          )}
        </div>
        <div className={styles.informationBoard}>
          <div className={styles.informationBoardBox}>
            {nextBlockBoard.map((row, y) =>
              row.map((cell, x) => (
                <div
                  className={styles.cell}
                  key={`${x}-${y}`}
                  style={{
                    backgroundColor: nextBlockBoard[y][x] === 0 ? '#98d7f5' : '#a556ff',
                    borderColor:
                      nextBlockBoard[y][x] === 0 ? '#98d7f5' : ' #cecece  #c69bff  #c69bff #cecece',
                    borderWidth: nextBlockBoard[y][x] === 0 ? 1 : 3,
                    borderRadius: 5,
                    width: '20px',
                    height: '20px',
                  }}
                />
              )),
            )}
          </div>
          <div
            className={styles.buttonsBox}
            style={{ marginTop: 240, flexFlow: 'column', gap: 15 }}
          >
            <div
              className={styles.buttons}
              onClick={() => touchControlHandler(5)}
              style={{ width: 100 }}
            >
              Restart
            </div>
            <div
              className={styles.buttons}
              onClick={() => touchControlHandler(6)}
              style={{ width: 100 }}
            >
              {isActive ? 'Stop' : 'Start'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
