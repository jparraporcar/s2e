import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimerState {
  time: number;
  isRunning: boolean;
}

export const initialState: TimerState = {
  time: 0,
  isRunning: false,
};

export const timerSlice = createSlice({
  name: "goal",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    tick: (state) => {
      state.time += 1;
    },
    offsetTimerInitialTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
  },
});

export const { startTimer, stopTimer, tick, offsetTimerInitialTime } =
  timerSlice.actions;

export default timerSlice.reducer;
