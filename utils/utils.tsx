import { IGoalState } from "../store/slices/goalSlice";

export interface GoalStateValidationResult {
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
}

const goalStateValidationResult: GoalStateValidationResult = {
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
};

export const validateAddGoalInputInfo = (
  goalState: IGoalState
): [boolean, GoalStateValidationResult] => {
  if (goalState.name && goalState.name.length < 5) {
    goalStateValidationResult.name.isValid = false;
    goalStateValidationResult.name.message =
      "Book name must be at least 5 characters long";
  } else {
    goalStateValidationResult.name.isValid = true;
  }

  if (goalState.book.length < 1 && goalState.course.length < 1) {
    goalStateValidationResult.resource.isValid = false;
    goalStateValidationResult.resource.message =
      "At least one book or one course must be chosen";
  } else {
    goalStateValidationResult.resource.isValid = true;
  }

  if (new Date(goalState.period.initialDay) < new Date()) {
    goalStateValidationResult.period.isValid = false;
    goalStateValidationResult.period.message =
      "Minimum date to start goal is today";
  } else {
    goalStateValidationResult.period.isValid = true;
  }
  // create array with all isSelected !== false values, validation fails if there is none truthy value
  const testAllSelected = Object.keys(goalState.dedication).filter(
    (key: string) =>
      goalState.dedication[key as keyof IGoalState["dedication"]].isSelected !==
      false
  );

  // create array with all isSelected !== 0 values, validation fails if there is no value different than 0
  const testDedicationHours = Object.keys(goalState.dedication).filter(
    (key: string) =>
      goalState.dedication[key as keyof IGoalState["dedication"]].hours !== 0
  );

  if (testAllSelected.length === 0 || testDedicationHours.length === 0) {
    (goalStateValidationResult.dedication.isValid = false),
      (goalStateValidationResult.dedication.message =
        "at least one day must be selected and/or a positive number of hours");
  } else {
    goalStateValidationResult.dedication.isValid = true;
  }

  const allValid =
    Object.keys(goalStateValidationResult)
      .map(
        (key: any) =>
          goalStateValidationResult[key as keyof GoalStateValidationResult]
            .isValid
      )
      .filter((value) => value === false).length === 0
      ? true
      : false;

  return [allValid, goalStateValidationResult];
};
