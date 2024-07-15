import { ModeSession, Prisma, PrismaClient } from '@prisma/client';
import {
  ICreateModeSessionRequest,
  IGetModeSessionRequest,
  IGetModeTrialsOfPatientRequest,
  IUpdateModeSessionRequest
} from '../../domain/interface/mode-session-request.interface';
import { IModeSessionRepository } from '../../domain/repositories/mode-session-repository';

export class PrismaModeSessionRepository implements IModeSessionRepository {
  constructor(private db: PrismaClient) {}

  getModeTrialsOfPatient({ startDate, endDate, search, modeId, patientId }: IGetModeTrialsOfPatientRequest): Promise<ModeSession[] | null> {
    let args: Prisma.ModeSessionFindManyArgs['where'] = {
      deletedAt: null,
      modeId,
      patientId
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

    return this.db.modeSession.findMany({
      where: {
        ...args
      },
      include: {
        modeTrialSession: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
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
