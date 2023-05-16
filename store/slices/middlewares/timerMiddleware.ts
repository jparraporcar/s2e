import { Middleware } from "redux";
import { startTimer, stopTimer, tick } from "../timerSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TimerAction =
  | ReturnType<typeof startTimer>
  | ReturnType<typeof stopTimer>
  | ReturnType<typeof tick>;

type Interval = { goalId: number | null; intervalId: number | null };

let intervals: Interval[] = [];
let currentIntervalIndex: number;

const timerMiddleware: Middleware =
  (store) => (next) => (action: PayloadAction<{ goalId: number }>) => {
    if (action.type === startTimer.type) {
      // find the index of the interval corresponding to the current measuring goal. If there is still not measuring goal
      // then currentIntervalIndex will be -1
      // it means it is not
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
      intervals.forEach((interval) => {
        if (
          interval.goalId !== action.payload.goalId &&
          interval.intervalId !== null
        ) {
          clearInterval(interval.intervalId);
        }
      });
      if (intervals[currentIntervalIndex].intervalId === null) {
        intervals[currentIntervalIndex].intervalId = setInterval(() => {
          store.dispatch(tick({ goalId: action.payload.goalId }));
        }, 1000);
      }
    } else if (action.type === stopTimer.type) {
      clearInterval(intervals[currentIntervalIndex].intervalId as number);
      intervals[currentIntervalIndex].intervalId = null;
    }

    return next(action);
  };

export default timerMiddleware;
