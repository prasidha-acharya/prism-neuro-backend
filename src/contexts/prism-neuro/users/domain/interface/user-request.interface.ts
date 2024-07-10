import { OTP_TYPE, USER_ROLES } from '@prisma/client';

export interface ICreateAdmin {
  email: string;
  password: string;
  // userName: string;
  address: string;
}

export interface ICreateAdminRequest extends ICreateAdmin {
  role: USER_ROLES;
}

export interface ICreateDoctorRequest extends ICreateAdmin {
  role: USER_ROLES;
  firstName: string;
  lastName: string;
}

export interface ICreatePatientRequest extends ICreateAdmin {
  role: USER_ROLES;
  firstName: string;
  lastName: string;
}

export interface IUpdateDoctorRequest {
  id: string;
  data: {
    firstName: string;
    lastName: string;
  };
}

export interface IFogotPasswordRequest {
  // userId: string;
  expiresAt: Date;
  type: OTP_TYPE;
  otpCode: string;
}

export interface deleteOtp {
  type: OTP_TYPE;
  otpId: string;
  userId?: string;
}

export interface IChangePassword {
  userId: string;
  data: {
    password: string;
  };
}

export interface IResetPassword {
  email: string;
  data: {
    password: string;
  };
}

export interface IFetchOtpRequest {
  userId: string;
  type: OTP_TYPE;
  otp: string;
}

export interface IFetchUsersRequest {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  createdBy?: string;
  role?: USER_ROLES;
  limit?: number;
  page?: number;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  role: USER_ROLES;
  email: string;
  password: string;
}

export interface ICreatePhysioDetail {
  age?: number;
  weight?: number;
  phoneCode?: string;
  phoneNumber?: string;
}
export interface ICreatePatientByPhysioRequest {
  data: ICreateUser;
  detail: ICreatePhysioDetail;
  address: string;
}

export interface IUpdatePatientRequest {
  id: string;
  data: Omit<ICreateUser, 'email' | 'password'>;
  detail: ICreatePhysioDetail;
}
