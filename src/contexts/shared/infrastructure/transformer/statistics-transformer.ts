import { Mode, MODE_TYPE, ModeTrialSession, Prisma } from '@prisma/client';

interface ModeResponse {
  id: string;
  type: MODE_TYPE;
  data: number;
}
export class StatisticsTransformer {
  modeAnalyticsTransformer(modes: Mode[]): ModeResponse[] {
    const result = modes.map((mode: any) => {
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
}
