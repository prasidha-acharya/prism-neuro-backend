import { Mode } from '@prisma/client';
import {
  ICreateBalanceModeRequest,
  ICreateLeftRightMode,
  ICreateTargetModeRequest,
  ICreateVisualBalanceModeRequest,
  IGetModeRequest
} from '../interface/mode-request.interface';

export interface IModeRepository {
  createTargetMode(request: ICreateTargetModeRequest, instructions: string[]): Promise<void>;
  createBalanceMode(request: ICreateBalanceModeRequest, instructions: string[]): Promise<void>;
  createLeftRightMode(request: ICreateLeftRightMode, instructions: string[]): Promise<void>;
  createVisualBalanceMode(request: ICreateVisualBalanceModeRequest, instructions: string[]): Promise<void>;
  getMode(request: IGetModeRequest): Promise<Mode | null>;
}
