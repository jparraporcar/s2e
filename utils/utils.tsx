import { merge } from "lodash";
import { RootState } from "../store/store";
import { GoalsListState } from "../store/slices/goalsListSlice";
import { TimersState } from "../store/slices/timerSlice";
import { QuizsListState } from "../store/slices/evaluationSlice";

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

export const deepMergeStateReconcilerGoals = (
  inboundState: GoalsListState,
  originalState: GoalsListState
) => {
  return merge({}, originalState, inboundState);
};

export const deepMergeStateReconcilerTimers = (
  inboundState: TimersState,
  originalState: TimersState
) => {
  return merge({}, originalState, inboundState);
};

export const deepMergeStateReconcilerQuizs = (
  inboundState: QuizsListState,
  originalState: QuizsListState
) => {
  return merge({}, originalState, inboundState);
};

export const calculatePercentatges = (
  time: number,
  periodInitial: string,
  periodFinal: string
) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!regEx.test(periodInitial) || !regEx.test(periodFinal)) {
    throw new Error("input periods must be of the format YYYY-MM-HH");
  }
  const dateA = new Date(periodInitial);
  const dateB = new Date(periodFinal);

  const differenceInSeconds =
    Math.abs(dateA.getTime() - dateB.getTime()) / 1000;

  return { todayPercentatge: 4 };
};

export const evalMeasureToday = (startTimeSeconds: number) => {
  const incrementSeconds = startTimeSeconds - new Date().getDate() / 1000;
  const isToday = incrementSeconds < 24 * 3600;
  const todaySecondsExceeded =
    incrementSeconds - 24 * 3600 > 0 ? incrementSeconds - 24 * 3600 : 0;

  return { isToday: isToday, todaySecondsExcedeed: todaySecondsExceeded };
};

export const createSesionDayString = () => {
  const todayString = new Date().toISOString().substring(0, 10);
  return todayString;
};
