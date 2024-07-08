import {
  ICreateBalanceModeRequest,
  ICreateLeftRightMode,
  ICreateTargetModeRequest,
  ICreateVisualBalanceModeRequest
} from '../interface/mode-request.interface';

export interface IModeRepository {
  createTargetMode(request: ICreateTargetModeRequest): Promise<void>;
  createBalanceMode(request: ICreateBalanceModeRequest): Promise<void>;
  createLeftRightMode(request: ICreateLeftRightMode): Promise<void>;
  createVisualBalanceMode(request: ICreateVisualBalanceModeRequest): Promise<void>;
}
