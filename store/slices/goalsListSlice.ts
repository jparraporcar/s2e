import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoalState, TBook, TCourse, TDayDedication } from "./goalSlice";

export type IGoalsListItem = {
  id: number;
  name: string;
  book: TBook[];
  course: TCourse[];
  period: {
    initialDay: string;
    finalDay: string;
  };
  dedication: {
    monday: TDayDedication;
    tuesday: TDayDedication;
    wednesday: TDayDedication;
    thursday: TDayDedication;
    friday: TDayDedication;
    saturday: TDayDedication;
    sunday: TDayDedication;
  };
};

export type IGoalsListState = IGoalsListItem[];

export const initialState = [] as IGoalsListState;

export const goalSlice = createSlice({
  name: "goalsList",
  initialState,
  reducers: {
    setAddGoal: (state, action: PayloadAction<IGoalState>) => {
      state.push({ ...action.payload, id: Math.random() });
    },
    setDeleteGoal: (state, action: PayloadAction<number>) => {
      state.filter((goal) => goal.id !== action.payload);
    },
    setEditGoal: (state, action: PayloadAction<IGoalsListState>) => {
      const editedGoal = state.find((goal) => goal.id);
    },
  },
});

export const { setAddGoal } = goalSlice.actions;

export default goalSlice.reducer;
