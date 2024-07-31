import { Mode, ModeDetail, ModeTrialSession } from '@prisma/client';

export interface IPrismaModeWithTrials extends Mode {
  modeTrialSession: ModeTrialSession[];
}

export interface IPrismaModeWithDetail extends Mode {
  modeDetail: ModeDetail | null;
  modeTrialSession: ModeTrialSession[];
}
