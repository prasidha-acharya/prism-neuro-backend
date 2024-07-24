import { ModeTrialSession, Prisma } from '@prisma/client';
import { IPrismaModeSessionRequest } from '../../../../contexts/prism-neuro/mode-session/domain/interface/mode-session-request.interface';
import {
  IGetModeSessionOfPatientResponse,
  IGetPatientsActivityResponse,
  IGetPatientsModeSessionByPhysioResponse,
  ITrials
} from '../../../../contexts/prism-neuro/mode-session/domain/interface/mode-session-response.interface';
import {
  IPaginateResponse,
  IPrismaUserForGetPatientsByPhysioResponse,
  IPrismaUserForGetPatientsDetailIncludingSessions
} from '../../../../contexts/prism-neuro/users/domain/interface/user.response.interface';

export class ModeTransformer {
  public modeSessionActivityOfAllPatientsByPhysio(
    users: IPrismaUserForGetPatientsByPhysioResponse[],
    modeId: string,
    { page, limit, endDate, startDate }: any
  ): IPaginateResponse<IGetPatientsModeSessionByPhysioResponse[]> {
    const activities = users?.reduce((results: IGetPatientsModeSessionByPhysioResponse[], user) => {
      const { firstName, lastName, id: userId, patientModeSession } = user;

      let initialData: IGetPatientsModeSessionByPhysioResponse = {
        id: '',
        user: {
          id: userId,
          fullName: `${firstName} ${lastName}`
        },
        trials: [],
        createdAt: new Date(),
        session: 0
      };

      const trials = patientModeSession.reduce(
        (modeTrials: IGetPatientsModeSessionByPhysioResponse[], { modeIds, modeTrialSession, id, createdAt }, index: number) => {
          if (modeIds.includes(modeId) || (modeIds.includes(modeId) && startDate && endDate && startDate <= createdAt >= endDate)) {
            const trialsFilteredByMode = modeTrialSession.reduce((trialResult: ITrials[], trialSession) => {
              if (trialSession.modeId === modeId) {
                let result: number | null = null;

                if (typeof trialSession.results === 'object') {
                  const value = trialSession.results as Prisma.JsonObject;
                  result = Number(value.data);
                }

                trialResult.push({
                  id: trialSession.id,
                  result,
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
      return [...results, ...trials];
    }, []);

    const totalPages = Math.ceil(activities.length / limit);

    return {
      data: activities,
      pagination: {
        limit,
        total: activities.length,
        totalPages,
        currentPage: page,
        isFirstPage: page === 1,
        isLastPage: totalPages === page
      }
    };
  }

  public modeSessionActivityOfAllPatients(
    users: IPrismaUserForGetPatientsDetailIncludingSessions[],
    { startDate, endDate, page, limit }: { startDate?: Date; endDate?: Date; page: number; limit: number }
  ): IPaginateResponse<IGetPatientsActivityResponse[]> {
    const activities = users?.reduce((results: IGetPatientsActivityResponse[], user) => {
      const { firstName, email, lastName, isVerified, id: userId, patientModeSession, physioTherapist } = user;

      const modeSession = patientModeSession.reduce((activity: IGetPatientsActivityResponse[], modeSessionOfPatient, index) => {
        const trialSessionIsDone = modeSessionOfPatient.modeTrialSession.length > 0;
        if (
          trialSessionIsDone ||
          (trialSessionIsDone && startDate && endDate && startDate <= modeSessionOfPatient.createdAt && modeSessionOfPatient.createdAt >= endDate)
        ) {
          activity.push({
            id: modeSessionOfPatient.id,
            createdAt: modeSessionOfPatient.createdAt,
            patient: {
              id: userId,
              fullName: `${firstName} ${lastName}`
            },
            email,
            isVerified,
            physioTherapist:
              physioTherapist !== null
                ? {
                    id: physioTherapist.id,
                    fullName: `${physioTherapist.firstName} ${physioTherapist.lastName}`
                  }
                : null,
            session: index + 1
          });
        }
        return activity;
      }, []);

      return [...results, ...modeSession];
    }, []);

    const totalPages = Math.ceil(activities.length / limit) ?? 0;

    const pagination = {
      limit,
      total: activities.length,
      totalPages,
      currentPage: page,
      isFirstPage: page === 1,
      isLastPage: page === totalPages
    };

    const offset = (page - 1) * limit;

    return { data: activities.slice(offset, offset + limit), pagination };
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
