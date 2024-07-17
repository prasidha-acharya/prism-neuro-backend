import { Mode, PrismaClient } from '@prisma/client';
import {
  ICreateBalanceModeRequest,
  ICreateLeftRightMode,
  ICreateTargetModeRequest,
  ICreateVisualBalanceModeRequest,
  IGetAllModesRequest,
  IGetModeByIdRequest,
  IGetModeByTypeRequest
} from '../../domain/interface/mode-request.interface';
import { IModeRepository } from '../../domain/repositories/mode-repository';

export class PrismaModeRepository implements IModeRepository {
  constructor(private db: PrismaClient) {}

  getModes(): Promise<Mode[] | null> {
    return this.db.mode.findMany({});
  }

  getAllModes({ startDate, endDate, patientId, physioId }: IGetAllModesRequest): Promise<Mode[] | null> {
    return this.db.mode.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        modeTrialSession: {
          some: {
            modeSession: {
              patientId,
              physioId
            }
          }
        }
      },
      include: {
        modeTrialSession: true
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
}
