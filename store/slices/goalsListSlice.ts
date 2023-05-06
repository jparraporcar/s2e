import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoalState } from "./goalSlice";

export interface IGoalsListItem extends IGoalState {
  id: number;
}

type IGoalsListState = IGoalsListItem[];

export const initialState = [] as IGoalsListState;

export const goalSlice = createSlice({
  name: "goalsList",
  initialState,
  reducers: {
    setAddGoal: (state, action: PayloadAction<IGoalState>) => {
      state.push({ ...action.payload, id: Math.random() });
    },
  },
});

export const { setAddGoal } = goalSlice.actions;

export default goalSlice.reducer;
