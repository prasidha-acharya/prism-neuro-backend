import { ModeSession, ModeTrialSession, Otp, User, UserAddress, UserDetail } from '@prisma/client';

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
  profileURL: string | null;
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
