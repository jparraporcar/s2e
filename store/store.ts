import { configureStore } from "@reduxjs/toolkit";
import goalSlice from "./slices/goalSlice";
import goalsListSlice from "./slices/goalsListSlice";
import goalValidationSlice from "./slices/goalValidationSlice";

export const store = configureStore({
  reducer: {
    goal: goalSlice,
    goalsList: goalsListSlice,
    goalValidation: goalValidationSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
