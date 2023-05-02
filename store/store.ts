import { configureStore } from "@reduxjs/toolkit";
import goalSlice from "./slices/goalSlice";

export const store = configureStore({
  reducer: {
    goal: goalSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
