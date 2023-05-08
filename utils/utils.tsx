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
  console.log(isGreater, "isGreater");
  // Condition2: dateA === dateB

  const isEqual = yearA === yearB && monthA === monthB && dayA === dayB;
  console.log(isEqual, "isEqual");

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

  console.log(
    isValid.isInitialDateGreaterOrEqualThanToday,
    "isValid.isInitialDateGreaterOrEqualThanToday"
  );

  console.log(
    isValid.isFinalDateGreaterOrEqualThanInitial,
    "isValid.isFinalDateGreaterOrEqualThanInitial"
  );

  return (
    isValid.isInitialDateGreaterOrEqualThanToday &&
    isValid.isFinalDateGreaterOrEqualThanInitial
  );
};
