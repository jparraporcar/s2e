import { Middleware, current } from "@reduxjs/toolkit";
import { resetTimer, startTimer, stopTimer, tick } from "../timerSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createSesionDayString } from "../../../utils/utils";
import { useAppSelector } from "../../hooks";
import { updateSesion, initializeSesion } from "../goalsListSlice";
import BackgroundTimer from "react-native-background-timer";

type TimerAction =
  | ReturnType<typeof startTimer>
  | ReturnType<typeof stopTimer>
  | ReturnType<typeof tick>;

type Interval = { goalId: number | null; intervalId: number | null };

let intervals: Interval[] = [];
let currentIntervalIndex: number;

const timerMiddleware: Middleware = (store) => (next) => (action) => {
  const state: RootState = store.getState();
  if (action.type === startTimer.type) {
    const timerState = state.timerList;
    currentIntervalIndex = intervals.findIndex(
      (interval) => interval.goalId === action.payload.goalId
    );
    if (currentIntervalIndex === -1) {
      intervals.push({ goalId: action.payload.goalId, intervalId: null });
      currentIntervalIndex = intervals.findIndex(
        (interval) => interval.goalId === action.payload.goalId
      );
    }
    if (
      intervals.length > 0 &&
      intervals[currentIntervalIndex].intervalId === null
    ) {
      BackgroundTimer.start();
      intervals[currentIntervalIndex].intervalId = setInterval(() => {
        store.dispatch(tick({ goalId: action.payload.goalId }));
      }, 1000);
    }
  } else if (action.type === stopTimer.type) {
    if (intervals.length > 0) {
      console.log(intervals, "intervals");
      clearInterval(intervals[currentIntervalIndex].intervalId as number);
      BackgroundTimer.stop();
      intervals[currentIntervalIndex].intervalId = null;
    }
  } else if (action.type === tick.type) {
    const goalId = action.payload.goalId;
    const goalsListState = state.goalsList;
    // const sesionDayString = "2023-05-18";
    const sesionDayString = createSesionDayString();
    const sesion = goalsListState.goals
      .find((goal) => goal.goalId === goalId)!
      .sesions.filter((sesion) => sesion.sesionDayString === sesionDayString);
    const sesionIndex = goalsListState.goals
      .find((goal) => goal.goalId === goalId)!
      .sesions.findIndex(
        (sesion) => sesion.sesionDayString === sesionDayString
      );
    const goalIndex = goalsListState.goals.findIndex(
      (goal) => goal.goalId === goalId
    );
    const timerState = state.timerList;
    const timerGoalIndex = state.timerList.timers.findIndex(
      (timer) => timer.goalId === goalId
    );
    if (
      sesionIndex !== -1 &&
      timerGoalIndex !== -1 &&
      timerState.timers[timerGoalIndex].isRunning === true &&
      goalsListState.goals[goalIndex].sesions[sesionIndex].sesionDayString ===
        sesionDayString
    ) {
      store.dispatch(
        updateSesion({
          sesionIndex: sesionIndex,
          goalIndex: goalIndex,
          sesionTiming: {
            sesionDayString:
              goalsListState.goals[goalIndex].sesions[sesionIndex]
                .sesionDayString,
            elapsedTimeSec: timerState.timers[timerGoalIndex].time,
            startTimeSec:
              goalsListState.goals[goalIndex].sesions[sesionIndex].startTimeSec,
          },
        })
      );
      // while measuring current goal, day has changed and therefore no sesion existing for the new
      // day so, the sesion of the new day has to be initialized and the timer set to 0
    } else if (
      sesionIndex === -1 && // due to change in the day a sesion is no longer found
      timerGoalIndex !== -1 && // the timer is still ticking and needs to be reset to 0 ( no need to stop it since
      // it still need to keep counting for the new day)
      timerState.timers[timerGoalIndex].isRunning === true
    ) {
      store.dispatch(resetTimer({ goalId: goalId }));
      store.dispatch(
        initializeSesion({
          goalIndex: goalIndex,
          sesionTiming: {
            sesionDayString: sesionDayString,
            elapsedTimeSec: 0,
            startTimeSec: Math.floor(Date.now() / 1000),
          },
        })
      );
    }
  }

  return next(action);
};

export default timerMiddleware;
