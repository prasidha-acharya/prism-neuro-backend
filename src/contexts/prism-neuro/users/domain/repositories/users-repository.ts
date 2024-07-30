import { LoginSession, OTP_TYPE, Otp, USER_ROLES, User } from '@prisma/client';
import {
  IChangePassword,
  ICreateAdminRequest,
  ICreatePatientByPhysioRequest,
  ICreatePhysioTherapistRequest,
  IFetchOtpRequest,
  IFetchUsersRequest,
  IFogotPasswordRequest,
  IGetTotalUsersRequest,
  IGetUserByRoleRequest,
  IGetUserRequest,
  IResetPassword,
  IUpdatePhysioTherapistRequest
} from '../../domain/interface/user-request.interface';
import { CreateSession } from '../interface/user-session.interface';
import {
  IGetTotalUsersResponse,
  IPaginateResponse,
  IPrismaUserForGetPatientsByPhysioResponse,
  IPrismaUserForGetPatientsDetailIncludingSessions
} from '../interface/user.response.interface';

export interface IPrismaUserRepository {
  createAdmin(request: ICreateAdminRequest): Promise<void>;

  getUserByEmail(request: IGetUserRequest): Promise<User | null>;

  createPhysioByAdmin(request: ICreatePhysioTherapistRequest): Promise<void>;

  updatePhysioOrAdmin(request: IUpdatePhysioTherapistRequest): Promise<User | null>;

  deleteUserByAdmin(userId: string, role: USER_ROLES): Promise<void>;

  deletePatientByPhysio(patientId: string, physioId: string): Promise<void>;

  createPatientByPhysio(request: ICreatePatientByPhysioRequest): Promise<void>;

  updatePatient(request: IUpdatePhysioTherapistRequest): Promise<User | null>;

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

  getTotalPatients(physioId: string): Promise<number>;

  getPatientsOfPhysio(physioId: string, search?: string): Promise<IPrismaUserForGetPatientsByPhysioResponse[] | null>;

  getAllPatientsIncludingTrialSession(search?: string): Promise<IPrismaUserForGetPatientsDetailIncludingSessions[] | null>;

  updateLastLogin(userId: string): Promise<void>;
}
