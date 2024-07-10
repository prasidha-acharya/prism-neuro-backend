export interface ISendMailRequest {
  to: string;
  subject: string;
  html: string;
}

export interface IRegisterMailRequest {
  email: string;
  otp: string;
}

export interface ISendPasswordToUserRequest {
  email: string;
  password: string;
}
