import { ModeTrialSession, Prisma } from '@prisma/client';
import { IPrismaModeWithDetail } from 'src/contexts/prism-neuro/mode/domain/interface/mode-response.interface';
import { IGetPatientsActivityByPhysioTransformerRequest } from 'src/contexts/prism-neuro/users/domain/interface/user-request.interface';
import { IPrismaModeSessionRequest } from '../../../../contexts/prism-neuro/mode-session/domain/interface/mode-session-request.interface';
import {
  IGetModesDetailForDashBoardResponse,
  IGetModesDetailForTabletResponse,
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
    users: IPrismaUserForGetPatientsByPhysioResponse[] | null,
    { page, limit, endDate, startDate, modeId }: IGetPatientsActivityByPhysioTransformerRequest
  ): IPaginateResponse<IGetPatientsModeSessionByPhysioResponse[] | null> {
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
          let isFilterable = false;

          if (startDate && endDate) {
            isFilterable = modeIds.includes(modeId) && startDate <= createdAt && createdAt <= endDate;
          } else {
            isFilterable = modeIds.includes(modeId);
          }

          if (isFilterable) {
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

    const totalPages = !activities ? 0 : Math.ceil(activities.length / limit);

    return {
      data: activities ?? null,
      pagination: {
        limit,
        total: activities?.length ?? 0,
        totalPages,
        currentPage: page,
        isFirstPage: page === 1,
        isLastPage: totalPages === page
      }
    };
  }

  public modeSessionActivityOfAllPatients(
    users: IPrismaUserForGetPatientsDetailIncludingSessions[] | null,
    { startDate, endDate, page, limit }: { startDate?: Date; endDate?: Date; page: number; limit: number }
  ): IPaginateResponse<IGetPatientsActivityResponse[] | null> {
    const activities = users?.reduce((results: IGetPatientsActivityResponse[], user) => {
      const { firstName, email, lastName, isVerified, id: userId, patientModeSession, physioTherapist } = user;

      const modeSession = patientModeSession.reduce((activity: IGetPatientsActivityResponse[], modeSessionOfPatient, index) => {
        const trialSessionIsDone = modeSessionOfPatient.modeTrialSession.length > 0;

        let isModeSummaryFilterable = false;

        if (startDate && endDate) {
          isModeSummaryFilterable =
            trialSessionIsDone && startDate && endDate && startDate <= modeSessionOfPatient.createdAt && modeSessionOfPatient.createdAt <= endDate;
        } else {
          isModeSummaryFilterable = trialSessionIsDone;
        }

        if (isModeSummaryFilterable) {
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

    const totalPages = !activities ? 0 : Math.ceil(activities.length / limit) ?? 0;

    const pagination = {
      limit,
      total: activities?.length ?? 0,
      totalPages,
      currentPage: page,
      isFirstPage: page === 1,
      isLastPage: page === totalPages
    };

    const offset = (page - 1) * limit;

    return { data: !activities ? null : activities?.slice(offset, offset + limit), pagination };
  }

  public modeSessionOfPatients(modeSessions: IPrismaModeSessionRequest[], sessionCount = 0): IGetModeSessionOfPatientResponse[] {
    return modeSessions.map(({ id, createdAt, modeTrialSession }, index) => {
      let session = sessionCount > 0 ? sessionCount + index + 1 : index + 1;
      return {
        id,
        session,
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

  public getModesDetailForTablet(modes: IPrismaModeWithDetail[]): IGetModesDetailForTabletResponse[] {
    return modes.map(({ trialCount, type, name, id, trialDuration, modeDetail, modeTrialSession }) => {
      return {
        id,
        trialCount,
        type,
        name,
        trialDuration,
        instructions: modeDetail?.instructions ?? [],
        modeTrialSession: modeTrialSession.map(({ id, trialId, startTime, endTime, status, createdAt, results }) => {
          let result: number | null = null;
          if (results && typeof results === 'object') {
            const trialObject = results as Prisma.JsonObject;
            result = Number(trialObject.data);
          }
          return {
            id,
            trialId,
            startTime,
            endTime,
            status,
            createdAt,
            results: result
          };
        })
      };
    });
  }

  public getModesDetailForDashboard(modes: IPrismaModeWithDetail[]): IGetModesDetailForDashBoardResponse[] {
    return modes.map(({ id, images, modeDetail, type, name }) => {
      return {
        id,
        images,
        instructions: modeDetail?.instructions ?? [],
        type,
        name
      };
    });
  }
}
