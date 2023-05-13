import { merge } from "lodash";
import { RootState } from "../store/store";
import { GoalsListState } from "../store/slices/goalsListSlice";

//A period is valid when dateA is greater or equal than DateB
export const isPeriodValidPartial = (dateA: Date, dateB: Date): boolean => {
  // Extract the year, month, and day parts from both dates
  const yearA = dateA.getFullYear();
  const monthA = dateA.getMonth();
  const dayA = dateA.getDate();

  const yearB = dateB.getFullYear();
  const monthB = dateB.getMonth();
  const dayB = dateB.getDate();

  // Condition1: dateA > dateB

  const isGreater =
    yearA > yearB ||
    (yearA === yearB && monthA > monthB) ||
    (yearA === yearB && monthA === monthB && dayA > dayB);
  // Condition2: dateA === dateB

  const isEqual = yearA === yearB && monthA === monthB && dayA === dayB;

  return isGreater || isEqual;
};

export const isPeriodValidTotal = (
  datePeriodInitial: Date,
  datePeriodFinal: Date
) => {
  type PerdiodValidation = {
    isInitialDateGreaterOrEqualThanToday: boolean | undefined;
    isFinalDateGreaterOrEqualThanInitial: boolean | undefined;
  };
  const isValid: PerdiodValidation = {
    isInitialDateGreaterOrEqualThanToday: undefined,
    isFinalDateGreaterOrEqualThanInitial: undefined,
  };

  const dateToday = new Date();

  isValid.isFinalDateGreaterOrEqualThanInitial = isPeriodValidPartial(
    datePeriodFinal,
    datePeriodInitial
  );
  isValid.isInitialDateGreaterOrEqualThanToday = isPeriodValidPartial(
    datePeriodInitial,
    dateToday
  );

  return (
    isValid.isInitialDateGreaterOrEqualThanToday &&
    isValid.isFinalDateGreaterOrEqualThanInitial
  );
};

export const deepMergeStateReconciler = (
  inboundState: GoalsListState,
  originalState: GoalsListState
) => {
  return merge({}, originalState, inboundState);
};
