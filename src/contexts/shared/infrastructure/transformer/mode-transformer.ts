import { ModeTrialSession, Prisma } from '@prisma/client';
import { IPrismaModeSessionRequest } from '../../../../contexts/prism-neuro/mode-session/domain/interface/mode-session-request.interface';
import { IGetModeSessionOfPatientResponse } from '../../../../contexts/prism-neuro/mode-session/domain/interface/mode-session-response.interface';

export class ModeTransformer {
  public modeSessionActivityOfAllPatientsByPhysio(modeSessions: IPrismaModeSessionRequest[]): IGetModeSessionOfPatientResponse[] {
    return modeSessions.map(({ id, createdAt, modeTrialSession, patient }, index) => {
      return {
        id,
        createdAt,
        patient: {
          id: patient.id,
          fullName: `${patient.firstName} ${patient.lastName}`,
          profileURL: patient?.userDetail?.profileURL ?? null
        },
        sessions: index + 1,
        trials: modeTrialSession.map(({ trialId, results, id, modeId }) => {
          let result: number | null = null;

          if (results && typeof results === 'object') {
            const trialObject = results as Prisma.JsonObject;
            result = Number(trialObject.data);
          }
          return { id, result, trialId, modeId };
        })
      };
    });
  }

  public modeSessionOfPatients(modeSessions: IPrismaModeSessionRequest[]): IGetModeSessionOfPatientResponse[] {
    return modeSessions.map(({ id, createdAt, modeTrialSession }) => {
      return {
        id,
        createdAt,
        trials: modeTrialSession.map(({ trialId, results, id, modeId }) => {
          let result: number | null = null;

          if (results && typeof results === 'object') {
            const trialObject = results as Prisma.JsonObject;
            result = Number(trialObject.data);
          }
          return { id, result, trialId, modeId };
        })
      };
    });
  }

  public getModeTrialsofActiveSessions = (trials: ModeTrialSession[]): { trialId: number; modeSessionId: string; results: number | null }[] => {
    return trials.map(({ trialId, modeSesssionId, results, modeId, id }) => {
      let result: number | null = null;
      if (results && typeof results === 'object') {
        const d = results as Prisma.JsonObject;
        result = Number(d.data);
      }
      return {
        id,
        trialId,
        modeId,
        modeSessionId: modeSesssionId,
        results: result
      };
    });
  };
}
