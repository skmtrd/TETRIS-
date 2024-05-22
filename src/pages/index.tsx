import { useEffect, useState } from 'react';
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
  const [blockHistory, setBlockHitory] = useState<number[][]>([generateUniqueList(), [], [0]]);
  const nextBlockBoard = create2DArray(4, 4, 0);
  const blockMove = [0, 0, 0, 0, 0, 0];
  const removeLine = board.length - 20;
  const startTimer = () => {
    setBoard(create2DArray(20, 10, 0));
    setIsActive(true);
  };
  const stopTimer = () => {
    setIsActive(false);
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
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent) => {
    event.preventDefault();
    const key = event.key;
    if (key === 'ArrowLeft') {
      newBlockMove[0] = 1;
    } else if (key === 'ArrowRight') {
      newBlockMove[1] = 1;
    } else if (key === 'ArrowDown') {
      newBlockMove[2] = 1;
    } else if (key === ' ') {
      newBlockMove[3] = 1;
    } else if (key === 'ArrowUp') {
      newBlockMove[4] = 1;
    }
  };
  if (newBlockHistory[0].length === 0) {
    const generatedBlocks = generateUniqueList();
    for (const blocks of generatedBlocks) {
      newBlockHistory[0].push(blocks);
    }
  }
  if (isActive) {
    for (const position of blocks[newBlockHistory[0][0]]) {
      nextBlockBoard[position[0] + 1][position[1] - 3] = 1;
    }
  }
  useEffect(() => {
    let interval = null;
    if (isActive) {
      const newBoard = structuredClone(board);
      interval = setInterval(
        () => {
          setSeconds((seconds) => seconds + 1);
          if (newBoard.flat().filter((cell) => cell === 1).length === 0) {
            newBlockHistory[2][0] = 0;
            const nextBlockType = newBlockHistory[0].shift();
            nextBlockType !== undefined && newBlockHistory[1].push(nextBlockType);
            if (nextBlockType !== undefined) {
              for (const position of blocks[nextBlockType]) {
                if (newBoard[position[0]][position[1]] === 2) {
                  stopTimer();
                  alert('game over');
                  return;
                }
                newBoard[position[0]][position[1]] = 1;
              }
            }
            console.log(newBlockHistory[1]);
            setBlockHitory(newBlockHistory);
            setBoard(newBoard);
          } else if (seconds % 100 === 0) {
            setBoard(blockFall(newBoard));
          } else if (newBlockMove[0] === 1) {
            setBoard(leftMoveBlock(newBoard));
          } else if (newBlockMove[1] === 1) {
            setBoard(rightMoveBlock(newBoard));
          } else if (newBlockMove[2] === 1) {
            setBoard(blockFall(newBoard));
          } else if (newBlockMove[3] === 1) {
            const updatedBoard: number[][] | undefined = hardDrop(newBoard);
            if (updatedBoard === undefined) return;
            setBoard(updatedBoard);
          } else if (newBlockMove[4] === 1) {
            newBlockHistory[2][0]++;
            console.log(newBlockHistory[1], newBlockHistory[1][newBlockHistory[1].length - 1]),
              setBoard(
                rotateBlock(
                  newBoard,
                  newBlockHistory[1][newBlockHistory[1].length - 1],
                  newBlockHistory[2][0],
                ),
              );
          } else {
            const removedBoard = removeBlocks(newBoard);
            setBoard(removedBoard);
          }

          setBlockHitory(newBlockHistory);
        },
        (10 * 1) / Math.floor(removeLine / 10 + 1),
      );
    } else if (!isActive) {
      if (interval !== null) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive, board, newBlockMove, seconds, newBlockHistory, nextBlockBoard, removeLine]);

  return (
    <div className={styles.container} onKeyDown={keyDownHandler} tabIndex={0}>
      <div
        className={styles.stratButton}
        onClick={startTimer}
        style={{ visibility: isActive ? 'hidden' : 'visible' }}
      >
        Start
      </div>
      <div className={styles.topInformation}>
        <div>Level : {Math.floor(removeLine / 10 + 1)}</div>
        <div style={{ marginLeft: 100 }}>remove : {removeLine}</div>
      </div>
      <div className={styles.base}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                style={{
                  backgroundColor: board[y][x] === 0 ? '#80266c' : '#a85b8f',
                  borderColor: board[y][x] === 0 ? 'black' : '#beaaa4 #ffffff #ffffff #beaaa4',
                  borderWidth: board[y][x] === 0 ? 1 : 4,
                }}
              />
            )),
          )}
        </div>
        <div className={styles.informationBoard}>
          <div>NextBlock</div>
          <div className={styles.informationBoardBox}>
            {nextBlockBoard.map((row, y) =>
              row.map((cell, x) => (
                <div
                  className={styles.cell}
                  key={`${x}-${y}`}
                  style={{
                    backgroundColor: nextBlockBoard[y][x] === 0 ? '#80266c' : '#a85b8f',
                    borderColor:
                      nextBlockBoard[y][x] === 0 ? 'black' : '#beaaa4 #ffffff #ffffff #beaaa4',
                    borderWidth: nextBlockBoard[y][x] === 0 ? 1 : 2,

                    width: '20px',
                    height: '20px',
                  }}
                />
              )),
            )}
          </div>
          <div className={styles.controlPanel}>
            <div className={styles.panelCell} />
            <div className={styles.panelCell} onClick={() => touchControlHandler(0)}>
              ⟳
            </div>
            <div className={styles.panelCell} />
            <div className={styles.panelCell} onClick={() => touchControlHandler(1)}>
              ←{' '}
            </div>
            <div className={styles.panelCell} onClick={() => touchControlHandler(2)}>
              ↓{' '}
            </div>
            <div className={styles.panelCell} onClick={() => touchControlHandler(3)}>
              →{' '}
            </div>
            <div className={styles.panelCell} />
            <div className={styles.panelCell} onClick={() => touchControlHandler(4)}>
              ↓↓↓
            </div>
            <div className={styles.panelCell} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
