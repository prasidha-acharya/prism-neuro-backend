import { PrismaClient, User, UserSession } from '@prisma/client';
import {
  IChangePassword,
  ICreateAdminRequest,
  ICreateDoctorRequest,
  ICreatePatientRequest,
  IFogotPasswordRequest,
  IResetPassword,
  IUpdateDoctorRequest
} from '../../domain/interface/user-request.interface';
import { CreateSession } from '../../domain/interface/user-session.interface';
import { IPrismaUserRepository } from '../../domain/repositories/users-repository';

export class PrismaUserRepository implements IPrismaUserRepository {
  constructor(private db: PrismaClient) {}

  deleteOTP(request: IFogotPasswordRequest): Promise<void> {
    console.log(request);
    throw new Error('Method not implemented.');
  }

  async resetPassword({ email, data }: IResetPassword): Promise<void> {
    await this.db.user.update({
      where: {
        email: email.toLowerCase()
      },
      data
    });
  }

  async changePassword({ userId, data }: IChangePassword): Promise<void> {
    await this.db.user.update({
      where: {
        id: userId
      },
      data
    });
  }

  async createOTP(request: IFogotPasswordRequest): Promise<void> {
    await this.db.otp.create({
      data: {
        ...request
      }
    });
  }

  async createSession({ deviceTokenId, userId }: CreateSession): Promise<UserSession> {
    return this.db.userSession.create({
      data: {
        deviceTokenId,
        userId
      }
    });
  }

  async removeSession(sessionId: string): Promise<void> {
    await this.db.userSession.update({
      where: {
        id: sessionId
      },
      data: {
        deletedAt: new Date()
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

  updatePatientByDoctor(request: IUpdateDoctorRequest): Promise<User | null> {
    return this.db.user.update({
      where: {
        id: request.id,
        deletedAt: {
          not: null
        }
      },
      data: {
        ...request.data
      }
    });
  }

  async deletePatientByDoctor(userId: string): Promise<void> {
    await this.db.user.delete({
      where: {
        id: userId
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

  updateDoctorByAdmin(request: IUpdateDoctorRequest): Promise<User | null> {
    return this.db.user.update({
      where: {
        id: request.id,
        deletedAt: {
          not: null
        }
      },
      data: {
        ...request.data
      }
    });
  }

  async deleteDoctorByAdmin(userId: string): Promise<void> {
    await this.db.user.update({
      where: {
        id: userId
      },
      data: {
        deletedAt: new Date()
      }
    });
  }
}
