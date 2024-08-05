import { ModeSession, ModeTrialSession, Otp, User, USER_ROLES, UserAddress, UserDetail } from '@prisma/client';
import { IAddress } from './user-request.interface';

export interface IPaginateResponse<T> {
  pagination: {
    limit: number;
    total: number;
    totalPages: number;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
  data: T;
}

export interface IGetTotalUsersResponse {
  totalUsers: number;
  user: number;
}

interface IPrismaModeSessionResponse extends ModeSession {
  modeTrialSession: ModeTrialSession[];
}
export interface IPrismaUserResponse extends User {
  userAddress: UserAddress[];
  userDetail?: UserDetail | null;
  physioModeSession: IPrismaModeSessionResponse[];
  patientModeSession: IPrismaModeSessionResponse[];
  otp: Otp;
  patients: User[];
  physioTherapist: User;
}

export interface IGetUserListByAdminResponse {
  id: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  // profileURL: string | null;
  userAddress: UserAddress[];
  age: number | null;
  weight: number | null;
  contactNumber: string | null;
  patients?: number;
}

export interface IGetPatientPerformance {
  bestScores: number;
  averageScores: number;
}

export interface IPrismaUserForGetPatientsByPhysioResponse extends User {
  userDetail?: UserDetail | null;
  patientModeSession: IPrismaModeSessionResponse[];
}

export interface IPrismaUserForGetPatientsDetailIncludingSessions extends IPrismaUserForGetPatientsByPhysioResponse {
  physioTherapist: User | null;
}

export interface IPrismaGetUserByEmail extends User {
  patientModeSession: ModeSession[];
  physioModeSession: ModeSession[];
  userAddress: UserAddress[];
  userDetail: UserDetail | null;
}

export interface UserResponse {
  id: string;
  email: string;
  isVerified: boolean;
  firstName: string | null; //for admin firstName and lastName can be null
  lastName: string | null;
  userName: string | null;
  userAddress: IAddress[];
  role: USER_ROLES;
  modeSession: ModeSession | null;
  phoneNumber: string | null;
  phoneCode: string | null;
  age: number | null;
  weight: number | null;
  lastLogin: Date | null;
  profile: {
    path: string | null;
    profileURL: string | null;
  };
}

export interface IPrismaUserDetailByEmailAndRole extends User {
  userAddress: UserAddress[];
  userDetail: UserDetail | null;
}

export interface IGetUserDetailByIdResponse {
  email: string;
  firstName: string | null;
  lastName: string | null;
  isVerified: boolean;
  weight: number | null;
  age: number | null;
  userAddress: IAddress[];
  phoneCode: string | null;
  phoneNumber: string | null;
}
