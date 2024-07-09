import { Mode } from '@prisma/client';
import {
  ICreateBalanceModeRequest,
  ICreateLeftRightMode,
  ICreateTargetModeRequest,
  ICreateVisualBalanceModeRequest,
  IGetModeRequest
} from '../interface/mode-request.interface';

export interface IModeRepository {
  createTargetMode(request: ICreateTargetModeRequest): Promise<void>;
  createBalanceMode(request: ICreateBalanceModeRequest): Promise<void>;
  createLeftRightMode(request: ICreateLeftRightMode): Promise<void>;
  createVisualBalanceMode(request: ICreateVisualBalanceModeRequest): Promise<void>;
  getMode(request: IGetModeRequest): Promise<Mode | null>;
}
