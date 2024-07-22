import { ModeTrialSession, Prisma } from '@prisma/client';
import { IPrismaModeSessionRequest } from '../../../../contexts/prism-neuro/mode-session/domain/interface/mode-session-request.interface';
import {
  IGetModeSessionOfPatientResponse,
  IGetPatientsModeSessionByPhysioResponse,
  ITrials
} from '../../../../contexts/prism-neuro/mode-session/domain/interface/mode-session-response.interface';
import { IPrismaUserForGetPatientsByPhysioResponse } from '../../../../contexts/prism-neuro/users/domain/interface/user.response.interface';

export class ModeTransformer {
  public modeSessionActivityOfAllPatientsByPhysio(
    users: IPrismaUserForGetPatientsByPhysioResponse[],
    modeId: string
  ): IGetPatientsModeSessionByPhysioResponse[] {
    return users?.reduce((results: IGetPatientsModeSessionByPhysioResponse[], user) => {
      const { firstName, lastName, id: userId, userDetail, patientModeSession } = user;

      let initialData: IGetPatientsModeSessionByPhysioResponse = {
        id: '',
        user: {
          id: userId,
          fullName: `${firstName} ${lastName}`,
          profileURL: userDetail?.profileURL ?? null
        },
        trials: [],
        createdAt: new Date(),
        session: 0
      };

      //

      const trials = patientModeSession.reduce(
        (modeTrials: IGetPatientsModeSessionByPhysioResponse[], { modeIds, modeTrialSession, id, createdAt }, index: number) => {
          if (modeIds.includes(modeId)) {
            const trialsFilteredByMode = modeTrialSession.reduce((trialResult: ITrials[], trialSession) => {
              if (trialSession.modeId === modeId) {
                trialResult.push({
                  id: trialSession.id,
                  result: 20,
                  trialId: trialSession.trialId
                });
              }
              return trialResult;
            }, []);

            if (trialsFilteredByMode.length) {
              modeTrials.push({
                ...initialData,
                id,
                trials: trialsFilteredByMode,
                createdAt,
                session: index + 1
              });
            }
          }

          return modeTrials;
        },
        []
      );

      results = trials;
      return results;
    }, []);
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
