import { User } from '@prisma/client';
import { ICreateAdminRequest } from '../../domain/interface/create-admin';

export interface IPrismaUserRepository {
  createAdmin(request: ICreateAdminRequest): Promise<void>;

  getAdminById(email: string): Promise<User | null>;
}
