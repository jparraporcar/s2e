import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deepMergeStateReconcilerTimers } from "../../utils/utils";

export interface TimerState {
  goalId: number;
  time: number;
  isRunning: boolean;
}

export interface TimersState {
  timers: TimerState[];
}

const initialState = {
  timers: [] as TimerState[],
};

const persistConfig = {
  key: "timerList",
  storage: AsyncStorage,
  whitelist: ["timers"],
  stateReconciler: (inboundState: TimersState, originalState: TimersState) => {
    return deepMergeStateReconcilerTimers(inboundState, originalState);
  },
};

export const timerListSlice = createSlice({
  name: "timerList",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initializeTimer: (state, action: PayloadAction<{ goalId: number }>) => {
      state.timers.push({
        goalId: action.payload.goalId,
        time: 0,
        isRunning: false,
      });
    },
    startTimer: (state, action: PayloadAction<{ goalId: number }>) => {
      const goalTimerIndex = state.timers.findIndex(
        (timer) => timer.goalId === action.payload.goalId
      );
      state.timers[goalTimerIndex].isRunning = true;
    },
    stopTimer: (state, action: PayloadAction<{ goalId: number }>) => {
      const goalTimerIndex = state.timers.findIndex(
        (timer) => timer.goalId === action.payload.goalId
      );
      state.timers[goalTimerIndex].isRunning = false;
    },
    tick: (state, action: PayloadAction<{ goalId: number }>) => {
      const goalTimerIndex = state.timers.findIndex(
        (timer) => timer.goalId === action.payload.goalId
      );
      state.timers[goalTimerIndex].time += 1;
    },
    resetTimer: (state, action: PayloadAction<{ goalId: number }>) => {
      const goalTimerIndex = state.timers.findIndex(
        (timer) => timer.goalId === action.payload.goalId
      );
      state.timers[goalTimerIndex].time = 0;
    },
  },
});

export const { startTimer, stopTimer, tick, resetTimer, initializeTimer } =
  timerListSlice.actions;

export const persistedTimerListReducerSlice = persistReducer(
  persistConfig,
  timerListSlice.reducer
);
