import { User, UserSession } from '@prisma/client';
import {
  ICreateAdminRequest,
  ICreateDoctorRequest,
  ICreatePatientRequest,
  IUpdateDoctorRequest
} from '../../domain/interface/user-request.interface';
import { CreateSession } from '../interface/user-session.interface';

export interface IPrismaUserRepository {
  createAdmin(request: ICreateAdminRequest): Promise<void>;

  getAdminByEmail(email: string): Promise<User | null>;

  createDoctorByAdmin(request: ICreateDoctorRequest): Promise<void>;

  updateDoctorByAdmin(request: IUpdateDoctorRequest): Promise<User | null>;

  deleteDoctorByAdmin(userId: string): Promise<void>;

  createPatientByDoctor(request: ICreatePatientRequest): Promise<void>;

  updatePatientByDoctor(request: IUpdateDoctorRequest): Promise<User | null>;

  deletePatientByDoctor(userId: string): Promise<void>;

  createSession(request: CreateSession): Promise<UserSession | null>;

  removeSession(session_id: string): Promise<void>;

  getSession(session_id: string): Promise<UserSession | null>;
}