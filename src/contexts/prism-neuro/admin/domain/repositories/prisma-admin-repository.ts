import { PrismaClient, User } from '@prisma/client';
import { IPrismaAdminRepository } from '../../infrastructure/repositories/prisma-admin-repository';
import { ICreateAdminRequest } from '../interface/create-admin';

export class PrismaAdminRepository implements IPrismaAdminRepository {
  constructor(private db: PrismaClient) {}

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
