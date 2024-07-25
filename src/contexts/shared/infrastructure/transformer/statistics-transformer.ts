import { MODE_TYPE, ModeTrialSession, Prisma } from '@prisma/client';
import { IPrismaModeWithTrials } from '../../../../contexts/prism-neuro/mode/domain/interface/mode-response.interface';

interface ModeResponse {
  id: string;
  type: MODE_TYPE;
  data: number;
}
export class StatisticsTransformer {
  modeAnalyticsTransformer(modes: IPrismaModeWithTrials[]): ModeResponse[] {
    const result = modes.map(mode => {
      const data = mode.modeTrialSession.reduce((a: number, trial: ModeTrialSession) => {
        //assuming
        if (trial.results && typeof trial.results === 'object') {
          const trialObject = trial.results as Prisma.JsonObject;
          const value = Number(trialObject.data);
          a += value;
        }

        return a;
      }, 0);

      return {
        id: mode.id,
        type: mode.type,
        data: data / mode.trialCount,
        createdAt: mode.createdAt
      };
    });

    return result;
  }

  modeComparisionTransformer(modes: IPrismaModeWithTrials[]): ModeResponse[] {
    const result = modes.map(mode => {
      const data = mode.modeTrialSession.reduce((a: number, trial: ModeTrialSession) => {
        //assuming
        if (trial.results && typeof trial.results === 'object') {
          const trialObject = trial.results as Prisma.JsonObject;
          const value = Number(trialObject.data);
          a += value;
        }

        return a;
      }, 0);

      return {
        id: mode.id,
        type: mode.type,
        data: data,
        createdAt: mode.createdAt
      };
    });

    return result;
  }
}
