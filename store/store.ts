import { configureStore } from "@reduxjs/toolkit";
import goalSlice from "./slices/goalSlice";
import { persistedGoalsListReducerSlice } from "./slices/goalsListSlice";
import goalValidationSlice from "./slices/goalValidationSlice";
import { persistedTimerListReducerSlice } from "./slices/timerSlice";
import timerMiddleware from "./slices/middlewares/timerMiddleware";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import reduxFlipper from "redux-flipper";
import { indexCourseMiddleWare } from "./slices/middlewares/indexCourseMiddleware";
import {
  evaluationSlice,
  persistedEvaluationReducerSlice,
} from "./slices/evaluationSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    timerList: persistedTimerListReducerSlice,
    goal: goalSlice,
    goalsList: persistedGoalsListReducerSlice,
    goalValidation: goalValidationSlice,
    evaluation: persistedEvaluationReducerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(timerMiddleware)
      .concat(reduxFlipper())
      .concat(indexCourseMiddleWare),
});

console.log("Store created");
console.log(store.getState(), "store.getState()");

export const persistor = persistStore(store, null, () => {
  console.log("Rehydration complete - store.getState()", store.getState());
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
