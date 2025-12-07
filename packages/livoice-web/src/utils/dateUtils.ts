export const getYearDateRange = (year: number) => {
  const startDate = new Date(year, 0, 1, 0, 0, 0, 0).toISOString();
  const endDate = new Date(year, 11, 31, 23, 59, 59, 999).toISOString();

  return {
    startDate,
    endDate
  };
};

export const getCurrentYear = () => new Date().getFullYear();

export const getYearOptions = (startYear: number = 2020, endYear?: number) => {
  const currentYear = endYear || getCurrentYear();
  const years: number[] = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return years;
};
