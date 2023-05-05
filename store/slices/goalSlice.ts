import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TBook = {
  Name: string;
  Author: string;
  Pages: number;
  Year: number;
};
export type TCourse = {
  Name: string;
  Instructor: string;
  Sections: number;
  Lectures: number;
};

export type TDayDedication = {
  isSelected: boolean;
  hours: number | undefined;
};

export interface IGoalState {
  name: string | undefined;
  book: TBook[];
  course: TCourse[];
  period: {
    initialDay: string;
    finalDay: string;
  };
  currentToggleDay: keyof IGoalState["dedication"];
  dedication: {
    monday: TDayDedication;
    tuesday: TDayDedication;
    wednesday: TDayDedication;
    thursday: TDayDedication;
    friday: TDayDedication;
    saturday: TDayDedication;
    sunday: TDayDedication;
  };
  resourceButtons: {
    isDisabledAddBook: boolean;
    isDisabledAddCourse: boolean;
  };
}

const initialState: IGoalState = {
  name: undefined,
  book: [],
  course: [],
  period: {
    initialDay: new Date().toISOString().substring(0, 10),
    finalDay: new Date().toISOString().substring(0, 10),
  },
  currentToggleDay: "monday",
  dedication: {
    monday: {
      isSelected: false,
      hours: undefined,
    },
    tuesday: {
      isSelected: false,
      hours: undefined,
    },
    wednesday: {
      isSelected: false,
      hours: undefined,
    },
    thursday: {
      isSelected: false,
      hours: undefined,
    },
    friday: {
      isSelected: false,
      hours: undefined,
    },
    saturday: {
      isSelected: false,
      hours: undefined,
    },
    sunday: {
      isSelected: false,
      hours: undefined,
    },
  },
  resourceButtons: {
    isDisabledAddBook: false,
    isDisabledAddCourse: false,
  },
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setBook: (state, action: PayloadAction<TBook | undefined>) => {
      if (!action.payload) {
        state.book = [];
        return;
      }
      state.book.push(action.payload);
    },
    setCourse: (state, action: PayloadAction<TCourse | undefined>) => {
      if (!action.payload) {
        state.course = [];
        return;
      }
      state.course.push(action.payload);
    },
    setPeriodInitial: (state, action: PayloadAction<string>) => {
      state.period.initialDay = action.payload;
    },
    setPeriodFinal: (state, action: PayloadAction<string>) => {
      state.period.finalDay = action.payload;
    },
    setDedicationHours: (
      state,
      action: PayloadAction<{
        day: keyof IGoalState["dedication"];
        hours: number;
      }>
    ) => {
      state.dedication[action.payload.day].hours = action.payload.hours;
    },
    toggleSelectedDay: (
      state,
      action: PayloadAction<{
        day: keyof IGoalState["dedication"];
      }>
    ) => {
      state.dedication[action.payload.day].isSelected =
        !state.dedication[action.payload.day].isSelected;
    },
    setCurrentToggleDay: (
      state,
      action: PayloadAction<keyof IGoalState["dedication"]>
    ) => {
      state.currentToggleDay = action.payload;
    },
    setResourceButtons: (
      state,
      action: PayloadAction<IGoalState["resourceButtons"]>
    ) => {
      state.resourceButtons = action.payload;
    },
  },
});

export const {
  setName,
  setBook,
  setCourse,
  setDedicationHours,
  toggleSelectedDay,
  setResourceButtons,
  setPeriodInitial,
  setPeriodFinal,
  setCurrentToggleDay,
} = goalSlice.actions;

export default goalSlice.reducer;
