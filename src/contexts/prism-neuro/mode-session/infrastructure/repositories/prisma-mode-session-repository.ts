import { MODE_SESSION_STATUS, MODE_TRIAL_SESSION_STATUS, ModeSession, Prisma, PrismaClient } from '@prisma/client';
import { IPaginateResponse } from '../../../../../contexts/prism-neuro/users/domain/interface/user.response.interface';
import {
  ICreateModeSessionRequest,
  IGetModeSessionRequest,
  IGetModeTrialsOfPatientRequest,
  IPrismaModeSessionOfPhysioAndPatientReponse,
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
    physioId,
    page = 1,
    limit = 10
  }: IGetModeTrialsOfPatientRequest): Promise<IPaginateResponse<any[] | null>> {
    let args: Prisma.ModeSessionFindManyArgs['where'] = {
      deletedAt: null,
      modeIds: {
        has: modeId
      },
      patientId,
      physioId,
      status: MODE_SESSION_STATUS.STOP,
      modeTrialSession: {
        every: {
          status: MODE_TRIAL_SESSION_STATUS.COMPLETED
        },
        some: {
          modeId
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
          patient: { include: { userDetail: true } },
          physio: { include: { userDetail: true } },
          modeTrialSession: {
            where: {
              modeId
            },
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

  getModeSessionOfPhysioAndPatient(request: IGetModeSessionRequest): Promise<IPrismaModeSessionOfPhysioAndPatientReponse | null> {
    return this.db.modeSession.findFirst({
      where: {
        ...request
      },
      include: { modeTrialSession: true }
    });
  }

  startModeSession(request: ICreateModeSessionRequest): Promise<ModeSession | null> {
    return this.db.modeSession.create({
      data: {
        ...request
      }
    });
  }

  async updateModeSession({ modeId, ...request }: IUpdateModeSessionRequest, sessionId: string): Promise<void> {
    let data: any = {
      ...request
    };

    if (modeId) {
      data = { ...data, modeIds: { push: modeId } };
    }

    await this.db.modeSession.update({
      where: { id: sessionId },
      data
    });
  }
}
