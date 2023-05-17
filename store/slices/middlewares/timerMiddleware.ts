import { Middleware } from "redux";
import { resetTimer, startTimer, stopTimer, tick } from "../timerSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createSesionDayString } from "../../../utils/utils";
import { useAppSelector } from "../../hooks";
import { updateSesion, initializeSesion } from "../goalsListSlice";

type TimerAction =
  | ReturnType<typeof startTimer>
  | ReturnType<typeof stopTimer>
  | ReturnType<typeof tick>;

type Interval = { goalId: number | null; intervalId: number | null };

let intervals: Interval[] = [];
let currentIntervalIndex: number;

const timerMiddleware: Middleware =
  (store) => (next) => (action: PayloadAction<{ goalId: number }>) => {
    const state: RootState = store.getState();
    if (action.type === startTimer.type) {
      // find the index of the interval corresponding to the current measuring goal. If there is still not measuring goal
      // then currentIntervalIndex will be -1
      currentIntervalIndex = intervals.findIndex(
        (interval) => interval.goalId === action.payload.goalId
      );
      // if currentIntervalIndex is -1 the interval needs to be initialized for the current goal
      if (currentIntervalIndex === -1) {
        intervals.push({ goalId: action.payload.goalId, intervalId: null });
        // once the current goal has been initialized and added to the intervals array, it needs to be found again,
        currentIntervalIndex = intervals.findIndex(
          (interval) => interval.goalId === action.payload.goalId
        );
      }
      // whenever startTimer is executed each goal that is different to the actual meauring goal has to be cleared
      // so that there cannot be 2 goals measuring at the same time. All goal timers intervalId's that are not
      // measuring the actual goal are not null so, they must be cleared
      intervals.forEach((interval) => {
        if (
          interval.goalId !== action.payload.goalId &&
          interval.goalId !== null &&
          interval.intervalId !== null
        ) {
          store.dispatch(stopTimer({ goalId: interval.goalId }));
          clearInterval(interval.intervalId);
        }
      });
      // start the timer for the current goal timer
      if (intervals[currentIntervalIndex].intervalId === null) {
        intervals[currentIntervalIndex].intervalId = setInterval(() => {
          store.dispatch(tick({ goalId: action.payload.goalId }));
        }, 1000);
      }
      // if stopTimer is executedm the current measuring goal has to be stopped and set to null
    } else if (action.type === stopTimer.type) {
      clearInterval(intervals[currentIntervalIndex].intervalId as number);
      intervals[currentIntervalIndex].intervalId = null;
    } else if (action.type === tick.type) {
      // current goal being measured
      const goalId = action.payload.goalId;
      // goalsList state
      const goalsListState = state.goalsList;
      // day string to check when there is a change in measuring day
      // const sesionDayString = "2023-05-18";
      const sesionDayString = createSesionDayString();
      // current sesion being measured for the current goal and for the current day string
      const sesion = goalsListState.goals
        .find((goal) => goal.id === goalId)!
        .sesions.filter((sesion) => sesion.sesionDayString === sesionDayString);
      // current sesion (index) being measured for the current goal and for the current day string
      const sesionIndex = goalsListState.goals
        .find((goal) => goal.id === goalId)!
        .sesions.findIndex(
          (sesion) => sesion.sesionDayString === sesionDayString
        );
      // current goal index for the goal being measured
      const goalIndex = goalsListState.goals.findIndex(
        (goal) => goal.id === goalId
      );
      // current timerState
      const timerState = state.timerList;
      // current timer index for the current goal being measured
      const timerGoalIndex = state.timerList.timers.findIndex(
        (timer) => timer.goalId === goalId
      );
      // update the sesion while the tick action is being dispathed by the interval. this
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
                goalsListState.goals[goalIndex].sesions[sesionIndex]
                  .startTimeSec,
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
