import { Mode, ModeTrialSession } from '@prisma/client';

export interface IPrismaModeWithTrials extends Mode {
  modeTrialSession: ModeTrialSession[];
}
