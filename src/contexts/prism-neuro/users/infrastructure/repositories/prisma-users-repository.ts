import { LoginSession, PrismaClient, User } from '@prisma/client';
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

  async createOTP(request: IFogotPasswordRequest, userId: string): Promise<void> {
    await this.db.otp.create({
      data: {
        ...request,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  async createSession({ deviceTokenId, userId }: CreateSession): Promise<LoginSession> {
    return this.db.loginSession.create({
      data: {
        deviceTokenId,
        userId
      }
    });
  }

  async removeSession(sessionId: string): Promise<void> {
    await this.db.loginSession.update({
      where: {
        id: sessionId
      },
      data: {
        deletedAt: new Date()
      }
    });
  }

  async getSession(sessionId: string): Promise<LoginSession | null> {
    return await this.db.loginSession.findUnique({
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
