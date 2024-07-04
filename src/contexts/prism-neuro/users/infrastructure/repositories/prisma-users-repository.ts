import { PrismaClient, User, UserSession } from '@prisma/client';
import { ICreateAdminRequest, ICreateDoctorRequest, ICreatePatientRequest } from '../../domain/interface/user-request.interface';
import { CreateSession } from '../../domain/interface/user-session.interface';
import { IPrismaUserRepository } from '../../domain/repositories/users-repository';

export class PrismaUserRepository implements IPrismaUserRepository {
  constructor(private db: PrismaClient) {}

  async createSession({ sessionId, deviceTokenId, userId }: CreateSession): Promise<void> {
    await this.db.userSession.create({
      data: {
        id: sessionId,
        deviceTokenId,
        userId
      }
    });
  }

  async removeSession(sessionId: string): Promise<void> {
    await this.db.userSession.delete({
      where: {
        id: sessionId
      }
    });
  }

  async getSession(sessionId: string): Promise<UserSession | null> {
    return await this.db.userSession.findUnique({
      where: {
        id: sessionId
      }
    });
  }

  async createPatientByDoctor(request: ICreatePatientRequest): Promise<void> {
    await this.db.user.create({
      data: {
        email: request.email,
        role: request.role,
        password: request.password,
        userName: request.userName,
        userDetails: {
          create: {
            address: request.address
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
        userDetails: {
          create: {
            address: request.address
          }
        }
      }
    });
  }

  async getAdminByEmail(email: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        email
      }
    });
  }

  async createDoctorByAdmin(request: ICreateDoctorRequest): Promise<void> {
    const { address, ...remainigRequest } = request;
    await this.db.user.create({
      data: {
        ...remainigRequest,
        userDetails: {
          create: {
            address
          }
        }
      }
    });
  }
}
