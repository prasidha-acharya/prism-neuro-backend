import { MODE_TRIAL_SESSION_STATUS } from '@prisma/client';

export interface IStartModeTrialRequest {
  modeId: string;
  trialId: number;
  startTime: string;
  modeSessionId: string;
}

export interface IEndModeTrialRequest {
  id: string;
  modeId: string;
  data: {
    results: any;
    rawData: any;
    endTime: string;
    status: MODE_TRIAL_SESSION_STATUS;
  };
}

export interface IGetModeTrialsRequest {
  modeId: string;
  modeSessionId: string;
}
