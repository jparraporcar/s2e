export const isPeriodValid = (dateInitial: Date, dateFinal: Date) => {
  type PerdiodValidation = {
    isInitialDateGreaterOrEqualThanToday: boolean | undefined;
    isFinalDateGreaterOrEqualThanInitial: boolean | undefined;
  };
  const isValid: PerdiodValidation = {
    isInitialDateGreaterOrEqualThanToday: undefined,
    isFinalDateGreaterOrEqualThanInitial: undefined,
  };

  const yearInitial = dateInitial.getFullYear();
  const monthInitial = dateInitial.getMonth();
  const dayInitial = dateInitial.getDate();

  const yearFinal = dateFinal.getFullYear();
  const monthFinal = dateFinal.getMonth();
  const dayFinal = dateFinal.getDate();

  const yearToday = new Date().getFullYear();
  const monthToday = new Date().getMonth();
  const dayToday = new Date().getDate();

  if (yearInitial < yearToday) {
    isValid.isInitialDateGreaterOrEqualThanToday = false;
  } else if (yearInitial === yearToday) {
    if (monthInitial < monthFinal) {
      isValid.isInitialDateGreaterOrEqualThanToday = false;
    } else if (monthInitial === monthToday) {
      if (dayInitial < dayToday) {
        isValid.isInitialDateGreaterOrEqualThanToday = false;
      } else {
        isValid.isInitialDateGreaterOrEqualThanToday = true;
      }
    } else {
      isValid.isInitialDateGreaterOrEqualThanToday = true;
    }
  } else {
    isValid.isInitialDateGreaterOrEqualThanToday = true;
  }

  if (yearFinal < yearInitial) {
    isValid.isFinalDateGreaterOrEqualThanInitial = false;
  } else if (yearInitial === yearToday) {
    if (monthFinal < monthInitial) {
      isValid.isFinalDateGreaterOrEqualThanInitial = false;
    } else if (monthInitial === monthToday) {
      if (dayFinal < dayInitial) {
        isValid.isFinalDateGreaterOrEqualThanInitial = false;
      } else {
        isValid.isFinalDateGreaterOrEqualThanInitial = true;
      }
    } else {
      isValid.isFinalDateGreaterOrEqualThanInitial = true;
    }
  } else {
    isValid.isFinalDateGreaterOrEqualThanInitial = true;
  }

  isValid.isFinalDateGreaterOrEqualThanInitial;

  return (
    isValid.isInitialDateGreaterOrEqualThanToday &&
    isValid.isFinalDateGreaterOrEqualThanInitial
  );
};
