import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoalState, TBook, TCourse, TDayDedication } from "./goalSlice";
import { isPeriodValidTotal } from "../../utils/utils";

export interface GoalValidationState {
  result: {
    name: {
      isValid: boolean;
      message: string | undefined;
    };
    resource: {
      isValid: boolean;
      message: string | undefined;
    };
    period: {
      isValid: boolean;
      message: string | undefined;
    };
    dedication: {
      isValid: boolean;
      message: string | undefined;
    };
  };
  isValidationPassed: boolean | undefined;
}

const initialState: GoalValidationState = {
  result: {
    name: {
      isValid: false,
      message: undefined,
    },
    resource: {
      isValid: false,
      message: undefined,
    },
    period: {
      isValid: false,
      message: undefined,
    },
    dedication: {
      isValid: false,
      message: undefined,
    },
  },
  isValidationPassed: undefined,
};

export const goalValidationSlice = createSlice({
  name: "goalValidation",
  initialState,
  reducers: {
    setGoalStateValidation: (state, action: PayloadAction<IGoalState>) => {
      if (action.payload.name && action.payload.name.length < 5) {
        state.result.name.isValid = false;
        state.result.name.message =
          "Book name must be at least 5 characters long";
      } else {
        state.result.name.isValid = true;
        state.result.name.message = "Success";
      }

      if (action.payload.book.length < 1 && action.payload.course.length < 1) {
        state.result.resource.isValid = false;
        state.result.resource.message =
          "At least one book or one course must be chosen";
      } else {
        state.result.resource.isValid = true;
        state.result.resource.message = "Success";
      }

      if (
        !isPeriodValidTotal(
          new Date(action.payload.period.initialDay),
          new Date(action.payload.period.finalDay)
        )
      ) {
        state.result.period.isValid = false;
        state.result.period.message = "The period introduced is wrong";
      } else {
        state.result.period.isValid = true;
        state.result.period.message = "Success";
      }
      // create array with all isSelected !== false values, validation fails if there is none truthy value
      const testAllSelected = Object.keys(action.payload.dedication).filter(
        (key: string) =>
          action.payload.dedication[key as keyof IGoalState["dedication"]]
            .isSelected !== false
      );

      // create array with all isSelected !== 0 values, validation fails if there is no value different than 0
      const testDedicationHours = Object.keys(action.payload.dedication).filter(
        (key: string) =>
          action.payload.dedication[key as keyof IGoalState["dedication"]]
            .hours !== 0
      );

      if (testAllSelected.length === 0 || testDedicationHours.length === 0) {
        (state.result.dedication.isValid = false),
          (state.result.dedication.message =
            "at least one day to select / number of hours > 0");
      } else {
        state.result.dedication.isValid = true;
        state.result.dedication.message = "Success";
      }

      const allValid =
        Object.keys(state.result).filter(
          (key: any) =>
            state.result[key as keyof GoalValidationState["result"]].isValid !==
            true
        ).length === 0;

      state.isValidationPassed = allValid;
    },
    setResetIsValidationPassed: (state) => {
      return { ...state, isValidationPassed: undefined };
    },
  },
});

export const { setGoalStateValidation, setResetIsValidationPassed } =
  goalValidationSlice.actions;

export default goalValidationSlice.reducer;
