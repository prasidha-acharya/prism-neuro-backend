// otp code length is 6
export const generateOtp = (): string => Math.floor(100000 + Math.random() * 90000).toString();
