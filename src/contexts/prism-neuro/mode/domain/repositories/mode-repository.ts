import { Mode } from '@prisma/client';
import {
  ICreateBalanceModeRequest,
  ICreateLeftRightMode,
  ICreateTargetModeRequest,
  ICreateVisualBalanceModeRequest,
  IGetAllModesRequest,
  IGetModeByIdRequest,
  IGetModeByTypeRequest
} from '../interface/mode-request.interface';

export interface IModeRepository {
  createTargetMode(request: ICreateTargetModeRequest, instructions: string[]): Promise<void>;
  createBalanceMode(request: ICreateBalanceModeRequest, instructions: string[]): Promise<void>;
  createLeftRightMode(request: ICreateLeftRightMode, instructions: string[]): Promise<void>;
  createVisualBalanceMode(request: ICreateVisualBalanceModeRequest, instructions: string[]): Promise<void>;
  getModeByType(request: IGetModeByTypeRequest): Promise<Mode | null>;
  getModeById(request: IGetModeByIdRequest): Promise<Mode | null>;
  getAllModes(request: IGetAllModesRequest): Promise<Mode[] | null>;
}
