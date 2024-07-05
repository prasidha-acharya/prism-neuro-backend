export const generateOtp = (): string => Math.floor(10000 + Math.random() * 90000).toString();
