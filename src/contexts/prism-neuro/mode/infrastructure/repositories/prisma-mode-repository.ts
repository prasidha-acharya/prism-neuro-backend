import { PrismaClient } from '@prisma/client';
import {
  ICreateBalanceModeRequest,
  ICreateLeftRightMode,
  ICreateTargetModeRequest,
  ICreateVisualBalanceModeRequest
} from '../../domain/interface/mode-request.interface';
import { IModeRepository } from '../../domain/repositories/mode-repository';

export class PrismaModeRepository implements IModeRepository {
  constructor(private db: PrismaClient) {}

  async createTargetMode(request: ICreateTargetModeRequest): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request
      }
    });
  }

  async createLeftRightMode(request: ICreateLeftRightMode): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {}
        }
      }
    });
  }

  async createVisualBalanceMode(request: ICreateVisualBalanceModeRequest): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request,
        modeDetail: {
          create: {}
        }
      }
    });
  }

  async createBalanceMode(request: ICreateBalanceModeRequest): Promise<void> {
    await this.db.mode.create({
      data: {
        ...request
      }
    });
  }
}
