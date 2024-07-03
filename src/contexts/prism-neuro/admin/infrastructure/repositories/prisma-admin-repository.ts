import { PrismaClient, User } from '@prisma/client';
import { ICreateAdminRequest } from '../../domain/interface/create-admin';
import { ICreateDoctorRequest } from '../../domain/interface/create-doctor';
import { IPrismaAdminRepository } from '../../domain/repositories/prisma-admin-repository';

export class PrismaAdminRepository implements IPrismaAdminRepository {
  constructor(private db: PrismaClient) {}

  async createDoctor(request: ICreateDoctorRequest): Promise<void> {
    const { address, ...remainigRequest } = request;
    await this.db.user.create({
      data: {
        ...remainigRequest,
        UserDetail: {
          create: {
            address
          }
        }
      }
    });
  }

  async createAdmin(request: ICreateAdminRequest): Promise<void> {
    await this.db.user.create({
      data: {
        email: request.email,
        role: request.role,
        password: request.password,
        userName: request.userName,
        UserDetail: {
          create: {
            address: request.address
          }
        }
      }
    });
  }

  async getAdminById(email: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        email
      }
    });
  }
}
