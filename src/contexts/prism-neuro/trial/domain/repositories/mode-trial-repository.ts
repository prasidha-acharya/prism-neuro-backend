import { IEndModeTrialRequest, IStartModeTrialRequest } from '../interface/mode-trial-request.interface';

export interface IModeTrialRepository {
  startModeTrial(request: IStartModeTrialRequest): Promise<void>;
  endModeTrial(request: IEndModeTrialRequest): Promise<void>;
}
