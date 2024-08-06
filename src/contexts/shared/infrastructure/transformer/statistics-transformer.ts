import { MODE_TYPE, ModeTrialSession, Prisma } from '@prisma/client';
import {
  IModeAnalyticsReponse,
  IPrismaModeAnalyticsReponse,
  IPrismaModeWithTrials
} from '../../../../contexts/prism-neuro/mode/domain/interface/mode-response.interface';
import { Filter } from '../../../../contexts/shared/domain/interface/enum';
import { fixedDigitNumber } from '../utils/utility';

interface ModeResponse {
  id: string;
  type: MODE_TYPE;
  data: number;
}
export class StatisticsTransformer {
  public modeAnalayticsTransformer(modes: IPrismaModeAnalyticsReponse[], filter: Filter): IModeAnalyticsReponse[] {
    const result = modes.reduce((finalResult: Record<string, IModeAnalyticsReponse>, mode) => {
      const { modeTrialSession } = mode;
      let total = 0;

      modeTrialSession.forEach(trialSession => {
        const year: string = trialSession.createdAt.getFullYear().toString(); // Extract year

        let label = '';

        if (filter === Filter.DAILY) {
          label = `${trialSession.createdAt.toLocaleString('default', { weekday: 'short' })}-${new Date(trialSession.createdAt).toLocaleDateString()}`;
        } else if (filter === Filter.MONTHLY) {
          label = `${trialSession.createdAt.toLocaleString('default', { month: 'short' })}-${year}`;
        }

        const result = trialSession.results as Prisma.JsonObject;
        if (!finalResult[label]) {
          total += 1;
          finalResult[label] = {
            label,
            [mode.type]: fixedDigitNumber(Number(result?.data ?? 0) / total)
          };
        } else {
          total += 1;
          finalResult[label] = {
            ...finalResult[label],
            [mode.type]: fixedDigitNumber(((finalResult[label]?.[mode.type] ?? 0) + Number(result?.data ?? 0)) / total)
          };
        }
      });

      return finalResult;
    }, {});

    return Object.values(result);
  }

  modeComparisionTransformer(modes: IPrismaModeWithTrials[]): ModeResponse[] {
    const result = modes.map(mode => {
      const data = mode.modeTrialSession.reduce((modeComparisionResult: number, trial: ModeTrialSession) => {
        if (trial.results && typeof trial.results === 'object') {
          const trialObject = trial.results as Prisma.JsonObject;
          const value = Number(trialObject.data);
          modeComparisionResult += value;
        }

        return modeComparisionResult;
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
