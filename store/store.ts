import { configureStore } from "@reduxjs/toolkit";
import goalSlice from "./slices/goalSlice";
import goalsListSlice from "./slices/goalsListSlice";

export const store = configureStore({
  reducer: {
    goal: goalSlice,
    goalsList: goalsListSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
