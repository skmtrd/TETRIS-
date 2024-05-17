import { useEffect, useState } from 'react';
import styles from './index.module.css';
function replaceChoiceNumber(array: number[][], preNum: number, newNum: number) {
  return array.map((row) => row.map((item) => (item === preNum ? newNum : item)));
}

const replaceNumberWithArray = (board: number[][], num: number, array: number[][]) => {
  for (const position of array) {
    board[position[0]][position[1]] = num;
  }
  return board;
};
const getRandomIntNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const create2DArray = (rows: number, cols: number, value: number) => {
  const array = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(value);
    }
    array.push(row);
  }
  return array;
};

const leftMoveBlock = (board: number[][]) => {
  const newBlockPosition = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === 1) {
        if (x === 0 || board[y][x - 1] === 2) {
          return board;
        }
        newBlockPosition.push([y, x - 1]);
      }
    }
  }
  const clearBoard = replaceChoiceNumber(board, 1, 0);
  const movedBoard = replaceNumberWithArray(clearBoard, 1, newBlockPosition);
  return movedBoard;
};

const rightMoveBlock = (board: number[][]) => {
  const newBlockPosition = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === 1) {
        if (x === 9 || board[y][x + 1] === 2) {
          return board;
        }
        newBlockPosition.push([y, x + 1]);
      }
    }
  }
  const clearBoard = replaceChoiceNumber(board, 1, 0);
  const movedBoard = replaceNumberWithArray(clearBoard, 1, newBlockPosition);
  return movedBoard;
};

const blockFall = (board: number[][]) => {
  const cellFix = [0];
  const newBlockPosition: number[][] = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === 1) {
        for (let f = 1; f < 19; f++) {
          if (board[y + f] === undefined) {
            cellFix[0] = 1;
            break;
          }
          const cursor = board[y + f][x];
          if (cursor === 1) continue;
          else if (cursor === 0) {
            newBlockPosition.push([y + 1, x]);
            break;
          } else if (cursor === 2) {
            cellFix[0] = 1;
            break;
          }
        }
        if (cellFix[0] === 1) break;
      }
    }
    if (cellFix[0] === 1) break;
  }
  if (cellFix[0] === 1) {
    const newBoard = replaceChoiceNumber(board, 1, 2);
    return newBoard;
  }
  const clearBoard = replaceChoiceNumber(board, 1, 0);
  const movedBoard = replaceNumberWithArray(clearBoard, 1, newBlockPosition);
  return movedBoard;
};

const hardDrop = (board: number[][]) => {
  const run = true;
  let newBoard: number[][] = board;
  while (run) {
    const falledBoard = blockFall(newBoard);
    const contineuFalling = [0];
    for (const row of falledBoard) {
      for (const cell of row) {
        if (cell === 1) {
          newBoard = falledBoard;
          contineuFalling[0] = 1;
          break;
        }
      }
      if (contineuFalling[0] === 1) break;
    }
    if (contineuFalling[0] === 1) continue;
    return newBoard;
  }
  return newBoard;
};

const Home = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [isActive, setIsActive] = useState(false);
  const [blockMove, setBlockMove] = useState([0, 0, 0, 0, 0, 0]); //落ちる、左、右、下、回転、ハードドロッ

  const startTimer = () => {
    setIsActive(true);
  };
  const keyDownHandler = (event: React.KeyboardEvent) => {
    event.preventDefault();
    const key = event.key;
    const newBlockMove = structuredClone(blockMove);
    if (key === 'ArrowLeft') {
      newBlockMove[1] = 1;
      setBlockMove(newBlockMove);
    } else if (key === 'ArrowRight') {
      newBlockMove[2] = 1;
      setBlockMove(newBlockMove);
    } else if (key === 'ArrowDown') {
      newBlockMove[3] = 1;
      setBlockMove(newBlockMove);
    } else if (key === ' ') {
      newBlockMove[5] = 1;
      setBlockMove(newBlockMove);
    }
    // } else if (key === ' ') {
    // } else if (key === 'ArrowUp') {
    // }
  };
  console.log(blockMove);
  useEffect(() => {
    //タイマー管理のuseEffect
    const newBlockMove = structuredClone(blockMove);
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        newBlockMove[0] = 1;
        setBlockMove(newBlockMove);
      }, 1000);
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
  }, [isActive, blockMove]);

  useEffect(() => {
    //レンダリング管理のuseEffect
    console.log(blockMove);
    let interval = null;
    const newBoard = structuredClone(board);
    const newBlockMove = structuredClone(blockMove);
    if (isActive) {
      if (blockMove[0] === 1) {
        interval = setInterval(() => {
          setBoard(blockFall(newBoard));
          newBlockMove[0] = 0;
          setBlockMove(newBlockMove);
        }, 10);
      } else {
        interval = setInterval(() => {
          if (blockMove[1] === 1) {
            setBoard(leftMoveBlock(newBoard));
            newBlockMove[1] = 0;
            setBlockMove(newBlockMove);
          } else if (blockMove[2] === 1) {
            setBoard(rightMoveBlock(newBoard));
            newBlockMove[2] = 0;
            setBlockMove(newBlockMove);
          } else if (blockMove[3] === 1) {
            setBoard(blockFall(newBoard));
            newBlockMove[3] = 0;
            setBlockMove(newBlockMove);
          } else if (blockMove[5] === 1) {
            setBoard(hardDrop(newBoard));
            newBlockMove[5] = 0;
            setBlockMove(newBlockMove);
          }
        }, 10);
      }
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
  }, [isActive, board, blockMove]);
  return (
    <div className={styles.container} onKeyDown={keyDownHandler} tabIndex={0}>
      <div className={styles.base} onClick={startTimer}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={styles.cell}
                key={`${x}-${y}`}
                style={{ backgroundColor: board[y][x] === 0 ? 'yellow' : 'white' }}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
