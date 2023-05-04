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

export interface IGoalState {
  name: string | undefined;
  book: TBook[];
  course: TCourse[];
  period: {
    initialDay: string;
    finalDay: string;
  };
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
  book: [],
  course: [],
  period: {
    initialDay: new Date().toISOString().substring(0, 10),
    finalDay: new Date().toISOString().substring(0, 10),
  },
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
  setPeriodInitial,
  setPeriodFinal,
} = goalSlice.actions;

export default goalSlice.reducer;
