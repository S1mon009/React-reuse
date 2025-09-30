export const getDayDifference = (startDate: string | undefined): number => {
  if (typeof startDate !== "string") return 0;
  const now = new Date().getTime();
  const start = new Date(startDate).getTime();

  return +((now - start) / (1000 * 60 * 60 * 24)).toFixed(0);
};
