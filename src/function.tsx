export {
  create2DArray,
  generateUniqueList,
  replaceChoiceNumber,
  replaceNumberWithArray,
  blockFall,
  hardDrop,
  leftMoveBlock,
  rightMoveBlock,
  rotateBlock,
  removeBlocks,
  colors,
  blocks,
  rotatePosiotions,
};
const colors = [
  ['#fff'],
  ['#ff1e1e'],
  ['#8e1eff'],
  ['#1e1eff'],
  ['#1eff8e'],
  ['#8eff1e'],
  ['#ffff1e'],
  ['#ff8e1e'],
];

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
  //1
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
  //2
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
  //3
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
      [-1, 1],
      [0, 0],
      [0, 1],
      [1, 1],
    ],
  ],
  //4
  [
    [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
    [
      [1, 1],
      [1, -1],
      [1, 0],
      [2, -1],
    ],
    [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ],
  ],
  //5
  [
    [
      [1, 0],
      [0, 0],
      [1, 1],
      [1, 2],
    ],

    [
      [0, 2],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, -1],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
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
//下にずらすとき色の保持しなければいけない
const removeBlocks = (board: number[][]) => {
  const newBlockposition = [];
  for (let y = 19; y >= 0; y--) {
    const fixedBlock = [0];
    for (let x = 0; x < 10; x++) {
      if (board[y][x] >= 10) {
        fixedBlock[0]++;
      }
    }
    if (fixedBlock[0] === 10) {
      board[y].fill(0);
      board.push([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
      for (let f = 0; f <= y; f++) {
        for (let x = 0; x < 10; x++) {
          if (board[f][x] >= 10) {
            newBlockposition.push([f + 1, x, board[f][x]]);
            board[f][x] = 0;
          }
        }
      }
      const newBoard = replaceNumberWithArrayAndColor(board, newBlockposition);
      return newBoard;
    } else {
      continue;
    }
  }
  return board;
};

const rotateBlock = (
  board: number[][],
  focusedBlock: number,
  countRotate: number,
  color: number,
) => {
  const preBlockPosition = [];
  const preBlockMinPosiotionY = [20];
  const preBlockMinPosiotionX = [10];

  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === color) {
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
      } else if (board[pos[0]] === undefined || board[pos[0]][pos[1]] >= 10) {
        return board;
      } else {
        run[0]++;
      }
    }
  }
  const newBoard = replaceNumberWithArray(
    replaceChoiceNumber(board, color, 0),
    color,
    newBlockPosition,
  );

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
const replaceNumberWithArrayAndColor = (board: number[][], array: number[][]) => {
  for (const [y, x, color] of array) {
    board[y][x] = color;
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

const leftMoveBlock = (board: number[][], color: number) => {
  const newBlockPosition = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === color) {
        if (x === 0 || board[y][x - 1] >= 10) {
          return board;
        }
        newBlockPosition.push([y, x - 1]);
      }
    }
  }
  const clearBoard = replaceChoiceNumber(board, color, 0);
  const movedBoard = replaceNumberWithArray(clearBoard, color, newBlockPosition);
  return movedBoard;
};

const rightMoveBlock = (board: number[][], color: number) => {
  const newBlockPosition = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === color) {
        if (x === 9 || board[y][x + 1] >= 10) {
          return board;
        }
        newBlockPosition.push([y, x + 1]);
      }
    }
  }
  const clearBoard = replaceChoiceNumber(board, color, 0);
  const movedBoard = replaceNumberWithArray(clearBoard, color, newBlockPosition);
  return movedBoard;
};

const blockFall = (board: number[][], color: number) => {
  const cellFix = [0];
  const newBlockPosition: number[][] = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      if (board[y][x] === color) {
        for (let f = 1; f < 19; f++) {
          if (board[y + f] === undefined) {
            cellFix[0] = 1;
            break;
          }
          const cursor = board[y + f][x];
          if (cursor === color) continue;
          else if (cursor === 0) {
            newBlockPosition.push([y + 1, x]);
            break;
          } else if (cursor >= 10) {
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
    const newBoard = replaceChoiceNumber(board, color, color + 10);
    return newBoard;
  }
  const clearBoard = replaceChoiceNumber(board, color, 0);
  const movedBoard = replaceNumberWithArray(clearBoard, color, newBlockPosition);
  return movedBoard;
};

const hardDrop = (board: number[][], color: number) => {
  const run = true;
  let newBoard: number[][] = board;
  while (run) {
    const falledBoard = blockFall(newBoard, color);
    const contineuFalling = [0];
    for (const row of falledBoard) {
      for (const cell of row) {
        if (cell === color) {
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
