import { LoginSession, MODE_SESSION_STATUS, OTP_TYPE, Otp, Prisma, PrismaClient, USER_ROLES, User } from '@prisma/client';
import {
  IChangePassword,
  ICreateAdminRequest,
  ICreateDoctorRequest,
  ICreatePatientByPhysioRequest,
  IFetchOtpRequest,
  IFetchUsersRequest,
  IFogotPasswordRequest,
  IGetTotalUsersRequest,
  IGetUserByRoleRequest,
  IGetUserRequest,
  IResetPassword,
  IUpdateDoctorRequest,
  IUpdatePatientReq
} from '../../domain/interface/user-request.interface';
import { CreateSession } from '../../domain/interface/user-session.interface';
import { IGetTotalUsersResponse, IPaginateResponse } from '../../domain/interface/user.response.interface';
import { IPrismaUserRepository } from '../../domain/repositories/users-repository';

export class PrismaUserRepository implements IPrismaUserRepository {
  constructor(private db: PrismaClient) {}

  async deletePatientByDoctor(patientId: string, physioId: string): Promise<void> {
    await this.db.user.update({
      where: {
        id: patientId,
        createdBy: physioId,
        role: USER_ROLES.PATIENT
      },
      data: { deletedAt: new Date() }
    });
  }

  getTotalPatients(physioId: string): Promise<number> {
    return this.db.user.count({
      where: {
        createdBy: physioId,
        deletedAt: null
      }
    });
  }

  updatePatient({ id, data, userDetail, addresses }: IUpdatePatientReq): Promise<User | null> {
    return this.db.user.update({
      where: {
        id
      },
      data: {
        ...data,
        userDetail: userDetail && {
          upsert: {
            where: {
              userId: id
            },
            create: {
              ...userDetail
            },
            update: {
              ...userDetail
            }
          }
        },
        userAddress: addresses && {
          updateMany: addresses?.map(address => {
            return {
              where: { id: address.id },
              data: {
                ...address
              }
            };
          })
        }
      }
    });
  }

  async getTotalUsers({ role, startDate, endDate }: IGetTotalUsersRequest): Promise<IGetTotalUsersResponse> {
    const [totalUsers, deletedUser] = await this.db.$transaction([
      this.db.user.count({
        where: {
          deletedAt: null,
          AND: { role, NOT: { role: 'ADMIN' } },
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      this.db.user.count({
        where: {
          AND: { role, NOT: { role: 'ADMIN' } },
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      })
    ]);

    return {
      totalUsers,
      user: totalUsers - deletedUser
    };
  }

  getUserByRole({ userId, role }: IGetUserByRoleRequest): Promise<User | null> {
    return this.db.user.findUnique({
      where: {
        id: userId,
        role: role
      }
    });
  }

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
        include: {
          // mode: true,
          userDetail: true,
          userAddress: true,
          physioTherapist: true,
          patientModeSession: {
            include: {
              modeTrialSession: true
            }
          }
        },
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

  async createPatientByPhysio(request: ICreatePatientByPhysioRequest): Promise<void> {
    await this.db.user.create({
      data: {
        ...request.data,
        userDetail: request.detail && {
          create: {
            ...request.detail
          }
        },
        userAddress: {
          create: {
            address: request.address
          }
        }
      }
    });
  }

  // updatePatientByPatient(request: IUpdateDoctorRequest): Promise<User | null> {
  //   return this.db.user.update({
  //     where: {
  //       id: request.id,
  //       deletedAt: {
  //         not: null
  //       }
  //     },
  //     data: {
  //       ...request.data
  //     }
  //   });
  // }

  async createAdmin(request: ICreateAdminRequest): Promise<void> {
    await this.db.user.create({
      data: {
        email: request.email,
        role: request.role,
        password: request.password,
        userAddress: {
          create: {
            address: request.address
          }
        }
      }
    });
  }

  async getUserByEmail({ email, role }: IGetUserRequest): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        email,
        role,
        deletedAt: null
      },
      include: {
        patientModeSession:
          role === USER_ROLES.PATIENT
            ? {
                where: {
                  status: MODE_SESSION_STATUS.START
                }
              }
            : false,
        physioModeSession:
          role === USER_ROLES.PHYSIO
            ? {
                where: {
                  status: MODE_SESSION_STATUS.START
                }
              }
            : false,
        userAddress: true,
        userDetail: true
      }
    });
  }

  async createPhysioByAdmin(request: ICreateDoctorRequest): Promise<void> {
    const { address, userDetail, ...remainigRequest } = request;

    await this.db.user.create({
      data: {
        ...remainigRequest,
        userAddress: {
          create: {
            address
          }
        },
        userDetail: {
          create: { ...userDetail }
        }
      }
    });
  }

  updatePhysioByAdmin(request: IUpdateDoctorRequest): Promise<User | null> {
    return this.db.user.update({
      where: {
        id: request.id,
        deletedAt: {
          not: null
        }
      },
      data: {
        ...request.data,
        userDetail: {
          update: {
            ...request.userDetail
          }
        }
      }
    });
  }

  async deleteUserByAdmin(userId: string, role: USER_ROLES): Promise<void> {
    await this.db.user.update({
      where: {
        id: userId,
        role
      },
      data: {
        deletedAt: new Date()
      }
    });
  }
}
