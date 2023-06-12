import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { GoalsItem, setAddGoal } from "../goalsListSlice";
import { RootState } from "../../store";
import { fetchCourseIndexOfGoal } from "../actions";

export const indexCourseMiddleWare: Middleware =
  (store) => (next) => (action: PayloadAction<GoalsItem>) => {
    if (action.type === setAddGoal.type) {
      const state: RootState = store.getState();
      // check if last goal added (due to .push in setAddGoal) has a course
      // in that case dispatch fetch course index thunk
      if (action.payload.goalData.course.length > 0) {
        store.dispatch(
          fetchCourseIndexOfGoal({
            courseGoal: action.payload.goalData.course[0],
          }) as any
        );
      }
    }
    return next(action);
  };
