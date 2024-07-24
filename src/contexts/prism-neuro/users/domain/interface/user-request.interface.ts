import { OTP_TYPE, USER_ROLES } from '@prisma/client';

export interface IGetUserRequest {
  email: string;
  role?: USER_ROLES;
}

export interface IAddress {
  id?: string;
  address: string;
}
export interface ICreateAdmin {
  email: string;
  password: string;
  address: IAddress[];
  phoneNumber?: string;
  phoneCode?: string;
}

export interface ICreateAdminRequest extends ICreateAdmin {
  role: USER_ROLES;
}

interface IUserDetail {
  phoneNumber?: string;
  phoneCode?: string;
  profileURL?: string;
}
export interface ICreatePhysioTherapistRequest extends ICreateAdmin {
  role: USER_ROLES;
  firstName: string;
  lastName: string;
  userDetail?: IUserDetail;
}

export interface ICreatePatientRequest extends ICreateAdmin {
  role: USER_ROLES;
  firstName: string;
  lastName: string;
}

export interface IUpdatePhysioTherapistRequest {
  id: string;
  data?: {
    firstName?: string;
    lastName?: string;
  };
  address?: IAddress[];
  userDetail?: IUserDetail;
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
  createdBy: string;
}

export interface ICreatePhysioDetail {
  age?: number;
  weight?: number;
  phoneCode?: string;
  phoneNumber?: string;
  profileURL?: string;
}
export interface ICreatePatientByPhysioRequest {
  data: ICreateUser;
  detail?: ICreatePhysioDetail;
  address: IAddress[];
}

export interface IUpdatePatientRequest {
  id: string;
  data: Omit<ICreateUser, 'email' | 'password'>;
  detail: ICreatePhysioDetail;
}

export interface IGetUserByRoleRequest {
  role: USER_ROLES;
  userId: string;
}

export interface IGetTotalUsersRequest {
  role?: USER_ROLES;
  startDate: Date;
  endDate: Date;
}

// update patient  [] >>>>>>>>>>>>>

export interface IUpdatePatientReq {
  id: string;
  data?: {
    firstName?: string;
    lastName?: string;
  };
  addresses?: [{ id: string; address: string }];
  userDetail?: {
    phoneCode?: string;
    phoneNumber?: string;
    age?: number;
    weight?: number;
    profileURL?: string;
  };
}
