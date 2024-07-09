import { Mode, PrismaClient } from '@prisma/client';
import {
  ICreateBalanceModeRequest,
  ICreateLeftRightMode,
  ICreateTargetModeRequest,
  ICreateVisualBalanceModeRequest,
  IGetModeRequest
} from '../../domain/interface/mode-request.interface';
import { IModeRepository } from '../../domain/repositories/mode-repository';

export class PrismaModeRepository implements IModeRepository {
  constructor(private db: PrismaClient) {}

  getMode(request: IGetModeRequest): Promise<Mode | null> {
    return this.db.mode.findFirst({ where: { type: request.type } });
  }

  async createTargetMode(request: ICreateTargetModeRequest): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {
            instructions: request.instructions
          }
        }
      }
    });
  }

  async createLeftRightMode(request: ICreateLeftRightMode): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {
            instructions: request.instructions
          }
        }
      }
    });
  }

  async createVisualBalanceMode(request: ICreateVisualBalanceModeRequest): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {
            instructions: request.instructions
          }
        }
      }
    });
  }

  async createBalanceMode(request: ICreateBalanceModeRequest): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {
            instructions: request.instructions
          }
        }
      }
    });
  }
}
