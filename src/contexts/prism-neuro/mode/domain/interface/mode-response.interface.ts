import { Mode, ModeDetail, ModeTrialSession, Prisma } from '@prisma/client';

export interface IPrismaModeWithTrials extends Mode {
  modeTrialSession: ModeTrialSession[];
}

export interface IPrismaModeWithDetail extends Mode {
  modeDetail: ModeDetail | null;
  modeTrialSession: ModeTrialSession[];
}

export interface IPrismaModeAnalyticsReponse extends Mode {
  modeTrialSession: {
    results: Prisma.JsonValue;
    createdAt: Date;
  }[];
}

export interface IModeAnalyticsReponse {
  label: string;
  BALANCE_MODE?: number;
  TARGET_MODE?: number;
  VISUAL_BALANCE_MODE?: number;
  LEFT_RIGHT_MODE?: number;
}
