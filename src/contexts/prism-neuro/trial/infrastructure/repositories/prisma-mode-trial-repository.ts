import { PrismaClient } from '@prisma/client';
import { IEndModeTrialRequest, IStartModeTrialRequest } from '../../domain/interface/mode-trial-request.interface';
import { IModeTrialRepository } from '../../domain/repositories/mode-trial-repository';

export class PrismaModeTrialRepository implements IModeTrialRepository {
  constructor(private db: PrismaClient) {}

  async startModeTrial(request: IStartModeTrialRequest): Promise<void> {
    await this.db.modeTrialSession.create({
      data: {
        startTime: request.startTime,
        trialId: request.trialId,
        mode: {
          connect: {
            id: request.modeId
          }
        }
      }
    });
  }

  async endModeTrial(request: IEndModeTrialRequest): Promise<void> {
    await this.db.modeTrialSession.update({
      where: {
        id: request.id,
        modeId: request.modeId
      },
      data: {
        ...request.data
      }
    });
  }
}
