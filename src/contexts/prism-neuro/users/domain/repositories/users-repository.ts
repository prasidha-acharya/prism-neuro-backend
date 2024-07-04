import { User, UserSession } from '@prisma/client';
import { ICreateAdminRequest, ICreateDoctorRequest, ICreatePatientRequest } from '../../domain/interface/user-request.interface';
import { CreateSession } from '../interface/user-session.interface';

export interface IPrismaUserRepository {
  createAdmin(request: ICreateAdminRequest): Promise<void>;

  getAdminByEmail(email: string): Promise<User | null>;

  createDoctorByAdmin(request: ICreateDoctorRequest): Promise<void>;

  createPatientByDoctor(request: ICreatePatientRequest): Promise<void>;

  createSession(request: CreateSession): Promise<void>;

  removeSession(session_id: string): Promise<void>;

  getSession(session_id: string): Promise<UserSession | null>;
}
