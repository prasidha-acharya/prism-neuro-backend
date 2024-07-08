import { OTP_TYPE, UserRoles } from '@prisma/client';

export interface ICreateAdmin {
  email: string;
  password: string;
  userName: string;
  address: string;
}

export interface ICreateAdminRequest extends ICreateAdmin {
  role: UserRoles;
}

export interface ICreateDoctorRequest extends ICreateAdmin {
  role: UserRoles;
  firstName: string;
  lastName: string;
}

export interface ICreatePatientRequest extends ICreateAdmin {
  role: UserRoles;
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
  role?: UserRoles;
  limit?: number;
  page?: number;
}
