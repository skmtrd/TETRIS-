import styles from '../styles/index.module.css';

import { colors } from '../function';
import { useGame } from '../Hooks/useGame';

import TopInfo from '../components/TopInfo';
import Board from '../components/Board';
import SideInfo from '../components/SideInfo';
const Home = () => {
  const {
    board,
    isActive,
    nextBlockBoard,
    removeLine,
    handleSwipe,
    touchControlHandler,
    keyDownHandler,
    rotateTouchHandler,
  } = useGame();

  return (
    <div
      className={styles.container}
      onKeyDown={keyDownHandler}
      tabIndex={0}
      {...handleSwipe}
      onClick={rotateTouchHandler}
    >
      <div className={styles.base}>
        <TopInfo removeLine={removeLine} />
        <Board
          board={board}
          isActive={isActive}
          colors={colors}
          touchControlHandler={touchControlHandler}
        />
        <SideInfo
          nextBlockBoard={nextBlockBoard}
          isActive={isActive}
          touchControlHandler={touchControlHandler}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default Home;
