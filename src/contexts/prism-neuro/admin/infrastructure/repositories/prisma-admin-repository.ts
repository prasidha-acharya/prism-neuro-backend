import { User } from '@prisma/client';
import { ICreateAdminRequest } from '../../domain/interface/create-admin';
import { ICreateDoctorRequest } from '../../domain/interface/create-doctor';

export interface IPrismaAdminRepository {
  createAdmin(request: ICreateAdminRequest): Promise<void>;

  getAdminById(email: string): Promise<User | null>;

  createDoctor(request: ICreateDoctorRequest): Promise<void>;
}
