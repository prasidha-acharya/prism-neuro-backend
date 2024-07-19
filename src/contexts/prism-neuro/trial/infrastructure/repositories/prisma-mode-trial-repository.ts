import { MODE_SESSION_STATUS, MODE_TRIAL_SESSION_STATUS, ModeTrialSession, PrismaClient } from '@prisma/client';
import { IEndModeTrialRequest, IGetModeTrialsRequest, IStartModeTrialRequest } from '../../domain/interface/mode-trial-request.interface';
import { IModeTrialRepository } from '../../domain/repositories/mode-trial-repository';

export class PrismaModeTrialRepository implements IModeTrialRepository {
  constructor(private db: PrismaClient) {}

  getModeTrialOfPatient(patientId: string): Promise<ModeTrialSession[]> {
    return this.db.modeTrialSession.findMany({
      where: {
        status: MODE_TRIAL_SESSION_STATUS.COMPLETED,
        deletedAt: null,
        modeSession: {
          patient: { id: patientId },
          modeIds: { isEmpty: false },
          status: MODE_SESSION_STATUS.STOP,
          deletedAt: null
        }
      }
    });
  }

  getModeTrialOfPhysio(physioId: string): Promise<ModeTrialSession[]> {
    return this.db.modeTrialSession.findMany({
      where: {
        status: MODE_TRIAL_SESSION_STATUS.COMPLETED,
        deletedAt: null,
        modeSession: {
          physioId,
          modeIds: { isEmpty: false },
          status: MODE_SESSION_STATUS.STOP,
          deletedAt: null
        }
      }
    });
  }

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

  async endModeTrial({ modeId, modeSesssionId, startTime, status, endTime, rawData, results, trialId }: IEndModeTrialRequest): Promise<void> {
    await this.db.modeTrialSession.create({
      data: {
        modeId,
        modeSesssionId,
        startTime,
        endTime,
        trialId,
        rawData,
        results,
        status
      }
    });
  }
}
