import { useEffect, useState } from 'react';
import styles from './index.module.css';

const blocks = [
  [
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ],
  [
    [0, 4],
    [0, 5],
    [1, 4],
    [1, 5],
  ],
  [
    [0, 5],
    [1, 4],
    [1, 5],
    [1, 6],
  ],
  [
    [0, 6],
    [1, 4],
    [1, 5],
    [1, 6],
  ],
  [
    [0, 4],
    [1, 4],
    [1, 5],
    [1, 6],
  ],
  [
    [0, 5],
    [0, 6],
    [1, 4],
    [1, 5],
  ],
  [
    [0, 4],
    [0, 5],
    [1, 5],
    [1, 6],
  ],
];
const rotatePosiotions = [
  [
    [
      [0, -1],
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [
      [2, -2],
      [2, -1],
      [2, 0],
      [2, 1],
    ],
    [
      [-2, 1],
      [-1, 1],
      [0, 1],
      [1, 1],
    ],
  ],
  [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  [
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 1],
    ],
    [
      [1, -1],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
  ],
  [
    [
      [2, -1],
      [2, 0],
      [2, 1],
      [1, 1],
    ],
    [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [2, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  [
    [
      [2, -1],
      [1, -1],
      [2, 0],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
    [
      [-1, 2],
      [-1, 1],
      [0, 1],
      [1, 1],
    ],
  ],
  [
    [
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 0],
    ],
    [
      [-1, 0],
      [0, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 0],
    ],
    [
      [-1, 0],
      [0, 0],
      [0, 1],
      [1, 1],
    ],
  ],
  [
    [
      [1, -1],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    [
      [-1, 2],
      [0, 1],
      [0, 2],
      [1, 1],
    ],
    [
      [1, -1],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    [
      [-1, 2],
      [0, 1],
      [0, 2],
      [1, 1],
    ],
  ],
];

const removeBlocks = (board: number[][]) => {
  const newBlockposition = [];
  for (let y = 19; y >= 0; y--) {
    const fixedBlock = [0];
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === 2) {
        fixedBlock[0]++;
      }
    }
    if (fixedBlock[0] === 10) {
      board[y].fill(0);
      board.push([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);

      for (let f = 0; f <= y; f++) {
        for (let x = 0; x < 10; x++) {
          if (board[f][x] === 2) {
            board[f][x] = 0;
            newBlockposition.push([f + 1, x]);
          }
        }
      }
      const newBoard = replaceNumberWithArray(board, 2, newBlockposition);
      return newBoard;
    } else {
      continue;
    }
  }
  return board;
};

const rotateBlock = (board: number[][], focusedBlock: number, countRotate: number) => {
  const preBlockPosition = [];
  const preBlockMinPosiotionY = [20];
  const preBlockMinPosiotionX = [10];

  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === 1) {
        preBlockPosition.push([y, x]);
      }
    }
  }
  for (const pos of preBlockPosition) {
    if (pos[0] < preBlockMinPosiotionY[0]) preBlockMinPosiotionY[0] = pos[0];
    if (pos[1] < preBlockMinPosiotionX[0]) preBlockMinPosiotionX[0] = pos[1];
  }
  const newBlockPosition = [];
  console.log(focusedBlock);
  const rotatePosition = rotatePosiotions[focusedBlock][countRotate % 4];
  for (const pos of rotatePosition) {
    const y = preBlockMinPosiotionY[0] + pos[0];
    const x = preBlockMinPosiotionX[0] + pos[1];
    newBlockPosition.push([y, x]);
  }
  const run = [0];
  while (run[0] !== 4) {
    run[0] = 0;
    for (const pos of newBlockPosition) {
      if (pos[1] > 9) {
        for (const pos of newBlockPosition) {
          pos[1] = pos[1] - 1;
        }
      } else if (pos[1] < 0) {
        for (const pos of newBlockPosition) {
          pos[1] = pos[1] + 1;
        }
      } else if (board[pos[0]] === undefined || board[pos[0]][pos[1]] === 2) {
        return board;
      } else {
        run[0]++;
      }
    }
  }
  const newBoard = replaceNumberWithArray(replaceChoiceNumber(board, 1, 0), 1, newBlockPosition);

  return newBoard;

  return board;
};
const generateUniqueList = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6];
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
};

function replaceChoiceNumber(array: number[][], preNum: number, newNum: number) {
  return array.map((row) => row.map((item) => (item === preNum ? newNum : item)));
}

const replaceNumberWithArray = (board: number[][], num: number, array: number[][]) => {
  for (const position of array) {
    board[position[0]][position[1]] = num;
  }
  return board;
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [blockHistory, setBlockHitory] = useState<number[][]>([generateUniqueList(), [], [0]]);
  const nextBlockBoard = create2DArray(4, 4, 0);
  const blockMove = [0, 0, 0, 0, 0, 0];
  const removeLine = [board.length - 20];
  const startTimer = () => {
    setIsActive(true);
  };
  const stopTimer = () => {
    setIsActive(false);
  };

  const newBlockMove = structuredClone(blockMove);
  const newBlockHistory: number[][] | undefined = structuredClone(blockHistory);

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
            setBoard(hardDrop(newBoard));
          } else if (newBlockMove[4] === 1) {
            newBlockHistory[2][0]++;
            console.log(newBlockHistory[1], newBlockHistory[1][newBlockHistory[1].length - 1]), // newBlockHistory[1][newBlockHistory[1].length - 1],
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
        (10 * 1) / Math.floor(removeLine[0] / 10 + 1),
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
  }, [isActive, board, newBlockMove, seconds, newBlockHistory, nextBlockBoard]);

  return (
    <div className={styles.container} onKeyDown={keyDownHandler} tabIndex={0}>
      <div className={styles.base} onClick={startTimer}>
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
          <div>removed Line</div>
          <div className={styles.informationBoardBox}>
            <div>{removeLine}</div>
          </div>
          <div>Level</div>
          <div className={styles.informationBoardBox}>
            <div>{Math.floor(removeLine[0] / 10 + 1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
