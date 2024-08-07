import { Mode, MODE_SESSION_STATUS, Prisma, PrismaClient } from '@prisma/client';
import {
  ICreateBalanceModeRequest,
  ICreateLeftRightMode,
  ICreateTargetModeRequest,
  ICreateVisualBalanceModeRequest,
  IGetAllModesRequest,
  IGetModeByIdRequest,
  IGetModeByTypeRequest,
  IModeAnalyticsQuery
} from '../../domain/interface/mode-request.interface';
import { IPrismaModeAnalyticsReponse, IPrismaModeWithDetail, IPrismaModeWithTrials } from '../../domain/interface/mode-response.interface';
import { IModeRepository } from '../../domain/repositories/mode-repository';

export class PrismaModeRepository implements IModeRepository {
  constructor(private db: PrismaClient) {}

  getModes(sessionId?: string): Promise<IPrismaModeWithDetail[] | null> {
    return this.db.mode.findMany({
      include: {
        modeDetail: true,
        modeTrialSession: {
          where: {
            modeSesssionId: sessionId
          }
        }
      }
    });
  }

  getAllModes({ startDate, endDate, patientId, physioId }: IGetAllModesRequest): Promise<IPrismaModeWithTrials[] | null> {
    return this.db.mode.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        modeTrialSession: {
          where: {
            modeSession: { patientId, physioId, status: MODE_SESSION_STATUS.STOP }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  getModeById({ modeId }: IGetModeByIdRequest): Promise<Mode | null> {
    return this.db.mode.findFirst({ where: { id: modeId } });
  }

  getModeByType(request: IGetModeByTypeRequest): Promise<Mode | null> {
    return this.db.mode.findFirst({ where: { type: request.type } });
  }

  async createTargetMode(request: ICreateTargetModeRequest, instructions: string[]): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {
            instructions
          }
        }
      }
    });
  }

  async createLeftRightMode(request: ICreateLeftRightMode, instructions: string[]): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {
            instructions
          }
        }
      }
    });
  }

  async createVisualBalanceMode(request: ICreateVisualBalanceModeRequest, instructions: string[]): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {
            instructions
          }
        }
      }
    });
  }

  async createBalanceMode(request: ICreateBalanceModeRequest, instructions: string[]): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {
            instructions
          }
        }
      }
    });
  }

  async getModeAnalyticsByQuery({ startDate, endDate, physioId, patientId }: IGetAllModesRequest): Promise<IPrismaModeAnalyticsReponse[]> {
    let args: Prisma.ModeTrialSessionFindManyArgs['where'] = {};

    let query: IModeAnalyticsQuery = {};

    if (physioId) {
      query = { ...query, physioId };
    }

    if (patientId) {
      query = { ...query, patientId };
    }

    if (startDate) {
      args = {
        ...args,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      };
    }

    return await this.db.mode.findMany({
      include: {
        modeTrialSession: {
          where: {
            ...args,
            modeSession: {
              ...query
            }
          },
          select: {
            results: true,
            createdAt: true
          }
        }
      }
    });
  }
}
