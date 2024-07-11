import { ModeTrialSession, PrismaClient } from '@prisma/client';
import { IEndModeTrialRequest, IGetModeTrialsRequest, IStartModeTrialRequest } from '../../domain/interface/mode-trial-request.interface';
import { IModeTrialRepository } from '../../domain/repositories/mode-trial-repository';

export class PrismaModeTrialRepository implements IModeTrialRepository {
  constructor(private db: PrismaClient) {}

  getModeTrials(request: IGetModeTrialsRequest): Promise<ModeTrialSession[] | null> {
    return this.db.modeTrialSession.findMany({
      where: {
        modeId: request.modeId,
        modeSesssionId: request.modeSessionId
      }
    });
  }

  async startModeTrial(request: IStartModeTrialRequest): Promise<void> {
    await this.db.modeTrialSession.create({
      data: {
        startTime: request.startTime,
        trialId: request.trialId,
        mode: {
          connect: {
            id: request.modeId
          }
        },
        modeSession: {
          connect: {
            id: request.modeSessionId
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
