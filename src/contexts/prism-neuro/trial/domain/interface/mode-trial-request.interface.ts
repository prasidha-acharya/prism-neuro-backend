import { MODE_TRIAL_SESSION_STATUS, Prisma } from '@prisma/client';

export interface IStartModeTrialRequest {
  modeId: string;
  trialId: number;
  startTime: string;
  modeSessionId: string;
}

export interface IEndModeTrialRequest {
  results: Prisma.JsonObject;
  rawData: Prisma.JsonObject;
  status: MODE_TRIAL_SESSION_STATUS;
  modeId: string;
  trialId: number;
  startTime: string;
  endTime: string;
  modeSesssionId: string;
}

export interface IGetModeTrialsRequest {
  modeId: string;
  modeSessionId: string;
}
