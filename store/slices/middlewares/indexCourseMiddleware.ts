import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { GoalsItem, setAddGoal } from "../goalsListSlice";
import { RootState } from "../../store";
import { fetchCourseIndexOfGoal } from "../actions";

export const indexCourseMiddleWare: Middleware =
  (store) => (next) => (action: PayloadAction<GoalsItem>) => {
    if (action.type === setAddGoal.type) {
      const state: RootState = store.getState();
      console.log("state.goalsList.goals", state.goalsList.goals);
      console.log("action.payload.goalId", action.payload.goalId);
      console.log("action.payload", action.payload);

      // check if last goal added (due to .push in setAddGoal) has a course
      // in that case dispatch fetch course index thunk
      console.log(
        "action.payload.goalData.course[0]",
        action.payload.goalData.course[0]
      );
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
