import { Middleware } from "redux";
import { startTimer, stopTimer, tick } from "../timerSlice";

type TimerAction =
  | ReturnType<typeof startTimer>
  | ReturnType<typeof stopTimer>
  | ReturnType<typeof tick>;

let intervalId: number | null;

const timerMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === startTimer.type) {
    if (!intervalId) {
      intervalId = setInterval(() => {
        store.dispatch(tick());
      }, 1000);
    }
  } else if (action.type === stopTimer.type) {
    clearInterval(intervalId as number);
    intervalId = null;
  }

  return next(action);
};

export default timerMiddleware;
