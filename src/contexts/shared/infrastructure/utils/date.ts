export const getStartDayOfDate = (date: Date): any => {
  let currentDate = new Date(date);

  // Set the time to 00:00:00
  return currentDate.setHours(0, 0, 0, 0);
};

export const getStartDayOfWeek = (): any => {
  let currentDate = new Date();

  // Calculate the date 7 days ago
  currentDate.setDate(currentDate.getDate() - 7);
};

export const getStartDayOfMonth = (): any => {
  let currentDate = new Date();

  // Calculate the date 7 days ago
  currentDate.setDate(currentDate.getDate() - 7);
};
