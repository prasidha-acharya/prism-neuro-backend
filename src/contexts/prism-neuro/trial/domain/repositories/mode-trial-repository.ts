import { IEndModeTrialRequest, IGetModeTrialRequest, IStartModeTrialRequest } from '../interface/mode-trial-request.interface';

export interface IModeTrialRepository {
  startModeTrial(request: IStartModeTrialRequest): Promise<void>;
  endModeTrial(request: IEndModeTrialRequest): Promise<void>;
  getModeTrial(request: IGetModeTrialRequest): Promise<any>;
}
