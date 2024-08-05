import { MODE_TYPE, ModeTrialSession, Prisma } from '@prisma/client';
import {
  IModeAnalyticsReponse,
  IPrismaModeAnalyticsReponse,
  IPrismaModeWithTrials
} from '../../../../contexts/prism-neuro/mode/domain/interface/mode-response.interface';

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
        data: Number((data / mode.trialCount).toFixed(2)),
        createdAt: mode.createdAt
      };
    });

    return result;
  }

  public newModeAnalayticsDashBoardTransformer(modes: IPrismaModeAnalyticsReponse[]): IModeAnalyticsReponse[] {
    const result = modes.reduce((finalResult: Record<string, IModeAnalyticsReponse>, mode) => {
      const { modeTrialSession } = mode;

      modeTrialSession.forEach(c => {
        const label: string = c.createdAt.toISOString().split('T')[0];

        // sun mon

        const result = c.results as Prisma.JsonObject;
        if (!finalResult[label]) {
          finalResult[label] = {
            label,
            [mode.type]: Number(result?.data ?? 0)
          };
        } else {
          finalResult[label] = {
            ...finalResult[label],
            [mode.type]: (finalResult[label]?.[mode.type] ?? 0) + Number(result?.data ?? 0)
          };
        }
      });

      return finalResult;
    }, {});

    return Object.values(result);
  }

  modeComparisionTransformer(modes: IPrismaModeWithTrials[]): ModeResponse[] {
    const result = modes.map(mode => {
      const data = mode.modeTrialSession.reduce((a: number, trial: ModeTrialSession) => {
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
        data: data > 0 ? Number((data / mode.trialCount).toFixed(2)) : 0,
        createdAt: mode.createdAt
      };
    });

    return result;
  }
}
