import { User } from '@prisma/client';
import { ICreateAdminRequest, ICreateDoctorRequest, ICreatePatientRequest } from '../../domain/interface/user-request.interface';

export interface IPrismaUserRepository {
  createAdmin(request: ICreateAdminRequest): Promise<void>;

  getAdminByEmail(email: string): Promise<User | null>;

  createDoctorByAdmin(request: ICreateDoctorRequest): Promise<void>;

  createPatientByDoctor(request: ICreatePatientRequest): Promise<void>;
}
