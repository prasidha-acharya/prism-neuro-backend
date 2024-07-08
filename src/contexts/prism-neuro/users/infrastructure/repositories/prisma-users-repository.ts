import { LoginSession, OTP_TYPE, Otp, Prisma, PrismaClient, User } from '@prisma/client';
import {
  IChangePassword,
  ICreateAdminRequest,
  ICreateDoctorRequest,
  ICreatePatientRequest,
  IFetchOtpRequest,
  IFetchUsersRequest,
  IFogotPasswordRequest,
  IResetPassword,
  IUpdateDoctorRequest
} from '../../domain/interface/user-request.interface';
import { CreateSession } from '../../domain/interface/user-session.interface';
import { IPaginateResponse } from '../../domain/interface/user.response.interface';
import { IPrismaUserRepository } from '../../domain/repositories/users-repository';

export class PrismaUserRepository implements IPrismaUserRepository {
  constructor(private db: PrismaClient) {}

  arguments(request: IFetchUsersRequest): Prisma.UserFindManyArgs['where'] {
    const { startDate, endDate, search, createdBy, role } = request;

    let args: Prisma.UserFindManyArgs['where'] = {
      deletedAt: null,
      createdBy: createdBy
    };

    if (role) {
      args = { ...args, role };
    }

    if (startDate) {
      args = {
        ...args,
        createdAt: {
          gte: startDate,
          lte: endDate ?? new Date()
        }
      };
    }

    if (search) {
      args = {
        ...args,
        OR: [
          {
            email: {
              contains: search
            },
            firstName: {
              contains: search
            }
          }
        ]
      };
    }

    return args;
  }

  async getPaginatedUsers(request: IFetchUsersRequest): Promise<IPaginateResponse<any>> {
    const { page = 1, limit = 10 } = request;
    const args = this.arguments(request);

    const [users, count] = await this.db.$transaction([
      this.db.user.findMany({
        where: args,
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip: (page - 1) * limit
      }),
      this.db.user.count({
        where: args
      })
    ]);

    const totalPages = Math.ceil(count / limit) ?? 0;

    return {
      data: users,
      pagination: {
        limit,
        total: count,
        totalPages,
        currentPage: page,
        isFirstPage: page === 0,
        isLastPage: page === totalPages - 1
      }
    };
  }

  async deleteAccount(userId: string): Promise<void> {
    await this.db.user.update({
      where: {
        id: userId
      },
      data: {
        deletedAt: new Date()
      }
    });
  }

  getOtp({ otp, type, userId }: IFetchOtpRequest): Promise<Otp | null> {
    return this.db.otp.findFirst({
      where: {
        otpCode: otp,
        type,
        expiresAt: {
          gte: new Date()
        },
        userId
      }
    });
  }

  async deleteOTP(otpId: string, type: OTP_TYPE): Promise<void> {
    await this.db.otp.delete({
      where: {
        id: otpId,
        type
      }
    });
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
    await this.db.loginSession.delete({
      where: {
        id: sessionId
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
