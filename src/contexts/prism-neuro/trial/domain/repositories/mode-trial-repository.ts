import { ModeTrialSession } from '@prisma/client';
import { IEndModeTrialRequest, IGetModeTrialsRequest, IStartModeTrialRequest } from '../interface/mode-trial-request.interface';

export interface IModeTrialRepository {
  startModeTrial(request: IStartModeTrialRequest): Promise<void>;
  endModeTrial(request: IEndModeTrialRequest): Promise<void>;
  getModeTrials(request: IGetModeTrialsRequest): Promise<ModeTrialSession[] | null>;
  getModeTrialOfPatient(patientId: string): Promise<ModeTrialSession[]>;
  getModeTrialOfPhysio(physioId: string): Promise<ModeTrialSession[]>;
}
