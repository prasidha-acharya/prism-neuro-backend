export const fixedDigitNumber = (data: number, digit: number = 2): number => {
  return Number(data.toFixed(digit));
};
