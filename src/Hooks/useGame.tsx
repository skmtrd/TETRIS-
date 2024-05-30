import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import swal from 'sweetalert2';
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
export const useGame = () => {
  const [board, setBoard] = useState(create2DArray(20, 10, 0));
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [blockHistory, setBlockHitory] = useState<number[][]>([[], [], []]);
  const nextBlockBoard = create2DArray(4, 4, 0);
  const blockMove = [0, 0, 0, 0, 0, 0];
  const removeLine = board.length - 20;

  const newBlockMove = structuredClone(blockMove);
  const newBlockHistory: number[][] | undefined = structuredClone(blockHistory);

  const toggleActive = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const resetGame = () => {
    setBoard(create2DArray(20, 10, 0));
    setSeconds(0);
    setIsActive(false);
    setBlockHitory([generateUniqueList(), [], [0]]);
  };

  const handleTouch = () => {
    newBlockMove[4] = 1;
  };

  const handleSwipe = useSwipeable({
    preventScrollOnSwipe: true,
    delta: 30,
    trackTouch: true,
    onSwiping: (evenData) => {
      if (evenData.absX > 100) {
        if (evenData.dir === 'Left') {
          touchControlHandler(1);
        } else if (evenData.dir === 'Right') {
          touchControlHandler(3);
        }
      }
    },
    onSwipedLeft: () => touchControlHandler(1),
    onSwipedRight: () => touchControlHandler(3),
    onSwipedDown: () => touchControlHandler(4),
  });

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
        resetGame();
        break;
      case 6:
        toggleActive();
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
        toggleActive();
        break;
      case 'r':
      case 'R':
        resetGame();
        break;
      default:
        break;
    }
  };

  if (newBlockHistory[0].length === 0) {
    const generatedBlocks = generateUniqueList();
    for (const blocks of generatedBlocks) {
      newBlockHistory[0].push(blocks);
    }
  }
  if (board.flat().filter((cell) => cell !== 0).length !== 0) {
    for (const position of blocks[newBlockHistory[0][0]]) {
      nextBlockBoard[position[0] + 1][position[1] - 3] = newBlockHistory[0][0] + 1;
    }
  }

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    let interval = null;
    if (isActive) {
      let newBoard = structuredClone(board);
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        if (newBoard.flat().filter((cell) => cell >= 1 && cell < 10).length === 0) {
          newBlockHistory[2][0] = 0;
          const nextBlockType = newBlockHistory[0].shift();
          nextBlockType !== undefined && newBlockHistory[1].push(nextBlockType);
          if (nextBlockType !== undefined) {
            for (const position of blocks[nextBlockType]) {
              if (newBoard[position[0]][position[1]] >= 10) {
                setIsActive(false);
                swal.fire({
                  icon: 'error',
                  title: 'Game Over',
                  background: '#161616',
                  color: '#ffffff',
                });
                setBoard(create2DArray(20, 10, 0));
                return;
              }
              newBoard[position[0]][position[1]] =
                newBlockHistory[1][newBlockHistory[1].length - 1] + 1;
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
            newBoard = blockFall(newBoard, newBlockHistory[1][newBlockHistory[1].length - 1] + 1);
          }
          if (newBlockMove[0] === 1) {
            newBoard = leftMoveBlock(
              newBoard,
              newBlockHistory[1][newBlockHistory[1].length - 1] + 1,
            );
          }
          if (newBlockMove[1] === 1) {
            newBoard = rightMoveBlock(
              newBoard,
              newBlockHistory[1][newBlockHistory[1].length - 1] + 1,
            );
          }
          if (newBlockMove[2] === 1) {
            newBoard = blockFall(newBoard, newBlockHistory[1][newBlockHistory[1].length - 1] + 1);
          }
          if (newBlockMove[3] === 1) {
            let updatedBoard: number[][] | undefined = hardDrop(
              newBoard,
              newBlockHistory[1][newBlockHistory[1].length - 1] + 1,
            );
            updatedBoard = blockFall(
              updatedBoard,
              newBlockHistory[1][newBlockHistory[1].length - 1] + 1,
            );
            if (updatedBoard === undefined) return;
            newBoard = updatedBoard;
          }
          if (newBlockMove[4] === 1) {
            newBlockHistory[2][0]++;
            newBoard = rotateBlock(
              newBoard,
              newBlockHistory[1][newBlockHistory[1].length - 1],
              newBlockHistory[2][0],
              newBlockHistory[1][newBlockHistory[1].length - 1] + 1,
            );
          }
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
  return {
    board,
    isActive,
    blockHistory,
    nextBlockBoard,
    removeLine,
    handleSwipe,
    touchControlHandler,
    resetButtonHandler: resetGame,
    keyDownHandler,
    rotateTouchHandler: handleTouch,
  };
};
