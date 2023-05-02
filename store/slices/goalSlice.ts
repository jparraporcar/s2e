import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TBook = {
  name: string;
  author: string;
  pages: number;
  year: number;
};
export type TCourse = {
  name: string;
  instructor: string;
  sections: number;
  subsections: number;
};

export interface IGoalState {
  name: string | undefined;
  books: TBook[];
  courses: TCourse[];
  dedication: {
    monday: {
      isSelected: boolean;
      name: "monday";
      hours: number | undefined;
    };
    tuesday: {
      isSelected: boolean;
      name: "tuesday";
      hours: number | undefined;
    };
    wednesday: {
      isSelected: boolean;
      name: "wednesday";
      hours: number | undefined;
    };
    thursday: {
      isSelected: boolean;
      name: "thursday";
      hours: number | undefined;
    };
    friday: {
      isSelected: boolean;
      name: "friday";
      hours: number | undefined;
    };
    saturday: {
      isSelected: boolean;
      name: "saturday";
      hours: number | undefined;
    };
    sunday: {
      isSelected: boolean;
      name: "sunday";
      hours: number | undefined;
    };
  };
  resourceButtons: {
    isDisabledAddBook: boolean;
    isDisabledAddCourse: boolean;
  };
}

const initialState: IGoalState = {
  name: undefined,
  books: [],
  courses: [],
  dedication: {
    monday: {
      isSelected: false,
      name: "monday",
      hours: undefined,
    },
    tuesday: {
      isSelected: false,
      name: "tuesday",
      hours: undefined,
    },
    wednesday: {
      isSelected: false,
      name: "wednesday",
      hours: undefined,
    },
    thursday: {
      isSelected: false,
      name: "thursday",
      hours: undefined,
    },
    friday: {
      isSelected: false,
      name: "friday",
      hours: undefined,
    },
    saturday: {
      isSelected: false,
      name: "saturday",
      hours: undefined,
    },
    sunday: {
      isSelected: false,
      name: "sunday",
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
        state.books = [];
        return;
      }
      state.books.push(action.payload);
    },
    setCourse: (state, action: PayloadAction<TCourse | undefined>) => {
      if (!action.payload) {
        state.courses = [];
        return;
      }
      state.courses.push(action.payload);
    },
    setDedication: (state, action: PayloadAction<IGoalState["dedication"]>) => {
      state.dedication = action.payload;
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
  setDedication,
  setResourceButtons,
} = goalSlice.actions;

export default goalSlice.reducer;
