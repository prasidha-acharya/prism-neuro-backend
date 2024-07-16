import { MODE_SESSION_STATUS, MODE_TRIAL_SESSION_STATUS, ModeSession, Prisma, PrismaClient } from '@prisma/client';
import { IPaginateResponse } from '../../../../../contexts/prism-neuro/users/domain/interface/user.response.interface';
import {
  ICreateModeSessionRequest,
  IGetModeSessionRequest,
  IGetModeTrialsOfPatientRequest,
  IPrismaModeSessionRequest,
  IUpdateModeSessionRequest
} from '../../domain/interface/mode-session-request.interface';
import { IModeSessionRepository } from '../../domain/repositories/mode-session-repository';

export class PrismaModeSessionRepository implements IModeSessionRepository {
  constructor(private db: PrismaClient) {}

  async getModeTrialsOfPatient({
    startDate,
    endDate,
    search,
    modeId,
    patientId,
    page = 1,
    limit = 10
  }: IGetModeTrialsOfPatientRequest): Promise<IPaginateResponse<IPrismaModeSessionRequest[] | null>> {
    let args: Prisma.ModeSessionFindManyArgs['where'] = {
      deletedAt: null,
      modeId,
      patientId,
      status: MODE_SESSION_STATUS.STOP,
      modeTrialSession: {
        every: {
          status: MODE_TRIAL_SESSION_STATUS.COMPLETED
        }
      }
    };

    if (startDate) {
      args = {
        ...args,
        createdAt: {
          gte: startDate,
          lte: endDate ?? new Date()
        }
      };
    }

    // TODO :
    if (search) {
      args = {
        ...args
      };
    }

    const [modeSessions, total] = await this.db.$transaction([
      this.db.modeSession.findMany({
        where: {
          ...args
        },
        include: {
          modeTrialSession: {
            include: { mode: true }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip: (page - 1) * limit
      }),
      this.db.modeSession.count({
        where: {
          ...args
        }
      })
    ]);

    const totalPages = Math.ceil(total / limit) ?? 0;

    return {
      data: modeSessions,
      pagination: {
        limit,
        total,
        totalPages,
        currentPage: page,
        isFirstPage: page === 0,
        isLastPage: page === totalPages - 1
      }
    };
  }

  getModeSessionOfPhysioAndPatient(request: IGetModeSessionRequest): Promise<ModeSession | null> {
    return this.db.modeSession.findFirst({
      where: {
        ...request
      }
    });
  }

  startModeSession(request: ICreateModeSessionRequest): Promise<ModeSession | null> {
    return this.db.modeSession.create({
      data: {
        ...request
      }
    });
  }

  async updateModeSession(request: IUpdateModeSessionRequest, sessionId: string): Promise<void> {
    await this.db.modeSession.update({
      where: { id: sessionId },
      data: {
        ...request
      }
    });
  }
}
