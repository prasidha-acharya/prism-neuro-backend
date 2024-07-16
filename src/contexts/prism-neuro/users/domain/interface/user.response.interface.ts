import { ModeSession, Otp, User, UserAddress, UserDetail } from '@prisma/client';

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

export interface IPrismaUserResponse extends User {
  userAddress: UserAddress[];
  userDetail?: UserDetail;
  physioModeSession: ModeSession[];
  patientModeSession: ModeSession[];
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
  userAddress: UserAddress[];
  age: number | null;
  weight: number | null;
  contactNumber: string | null;
  patients: number | null;
}
