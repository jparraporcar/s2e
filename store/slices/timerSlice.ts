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
  },
});

export const { startTimer, stopTimer, tick } = timerSlice.actions;

export default timerSlice.reducer;
