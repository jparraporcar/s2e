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
    } else if (action.type === tick.type) {
      const goalId = action.payload.goalId;
      const goalsListState = state.goalsList;
      // every time the screen is loaded, a string with the actual day is created
      const sesionDayString = createSesionDayString();
      // const sesionDayString = createSesionDayString();
      // in the current loaded goal look for an already existing sesion of the actual day if it exists
      const sesion = goalsListState.goals
        .find((goal) => goal.id === goalId)!
        .sesions.filter((sesion) => sesion.sesionDayString === sesionDayString);
      // look for the index of the sesion in the sesions array, if existing otherwise = -1
      const sesionIndex = goalsListState.goals
        .find((goal) => goal.id === goalId)!
        .sesions.findIndex(
          (sesion) => sesion.sesionDayString === sesionDayString
        );
      // look for the goal index (it will always be defined due to navigating to this screen with a goalId)
      const goalIndex = goalsListState.goals.findIndex(
        (goal) => goal.id === goalId
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
                goalsListState.goals[goalIndex].sesions[sesionIndex]
                  .startTimeSec,
            },
          })
        );
        // while measuring current goal, day has changed and therefore no sesion existing for the new
        // day so, the sesion of the new day has to be initialized and the timer set to 0
      } else if (
        sesionIndex !== -1 &&
        timerGoalIndex !== -1 &&
        timerState.timers[timerGoalIndex].isRunning === true &&
        goalsListState.goals[goalIndex].sesions[sesionIndex].sesionDayString !==
          sesionDayString // <-- day change while measuring
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
