import { LoginSession, OTP_TYPE, Otp, User } from '@prisma/client';
import {
  IChangePassword,
  ICreateAdminRequest,
  ICreateDoctorRequest,
  ICreatePatientByPhysioRequest,
  IFetchOtpRequest,
  IFetchUsersRequest,
  IFogotPasswordRequest,
  IGetTotalUsersRequest,
  IGetUserByRoleRequest,
  IGetUserRequest,
  IResetPassword,
  IUpdateDoctorRequest
} from '../../domain/interface/user-request.interface';
import { CreateSession } from '../interface/user-session.interface';
import { IGetTotalUsersResponse, IPaginateResponse } from '../interface/user.response.interface';

export interface IPrismaUserRepository {
  createAdmin(request: ICreateAdminRequest): Promise<void>;

  getUserByEmail(request: IGetUserRequest): Promise<User | null>;

  createPhysioByAdmin(request: ICreateDoctorRequest): Promise<void>;

  updatePhysioByAdmin(request: IUpdateDoctorRequest): Promise<User | null>;

  deletePhysioByAdmin(userId: string): Promise<void>;

  createPatientByPhysio(request: ICreatePatientByPhysioRequest): Promise<void>;

  updatePatientByPhysio(request: IUpdateDoctorRequest): Promise<User | null>;

  deletePatientByDoctor(userId: string): Promise<void>;

  createSession(request: CreateSession): Promise<LoginSession | null>;

  removeSession(session_id: string): Promise<void>;

  getSession(session_id: string): Promise<LoginSession | null>;

  createOTP(request: IFogotPasswordRequest, userId: string): Promise<void>;

  deleteOTP(userId: string, type: OTP_TYPE): Promise<void>;

  getOtp(request: IFetchOtpRequest): Promise<Otp | null>;

  resetPassword(request: IResetPassword): Promise<void>;

  changePassword(request: IChangePassword): Promise<void>;

  deleteAccount(userId: string): Promise<void>;

  getPaginatedUsers(request: IFetchUsersRequest): Promise<IPaginateResponse<User>>;

  getUserByRole(request: IGetUserByRoleRequest): Promise<User | null>;

  getTotalUsers(request: IGetTotalUsersRequest): Promise<IGetTotalUsersResponse>;

  // createPatientByPhysio(request: ICreateAdminRequest): Promise<void>;

  // updatePatientByDoctor(request: IUpdateDoctorRequest): Promise<User | null>;
}
