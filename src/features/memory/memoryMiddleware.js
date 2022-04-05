import { play, check, selectVisibleCards } from './memorySlice';
let activeTimer = null;

const gameMiddleware = ({ dispatch, getState }) => next => action => {
  // before play, if we're waiting for a "check" we'll
  // cancel the timer, check immediately and then continue
  // to play
  if (action.type === play.type && activeTimer) {
    clearTimeout(activeTimer);
    activeTimer = null;
    dispatch(check());
  }

  let result = next(action)

  // after play we count 2 seconds and check the status
  if (action.type === play.type) {
    if (selectVisibleCards(getState()).length === 2) {
      activeTimer = setTimeout(() => {
        dispatch(check());
      }, 2000);
    }
  }

  return result
};

export default gameMiddleware;
