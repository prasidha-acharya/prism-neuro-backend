import { MODE_TYPE } from '@prisma/client';

interface ICreateMode {
  type: MODE_TYPE;
  trialCount: number;
  name: string;
  instructions: string[];
}

export interface ICreateBalanceModeRequest extends ICreateMode {
  trialDuration: number;
}

export interface ICreateTargetModeRequest extends ICreateMode {
  trialDuration: number;
}

export interface ICreateLeftRightMode extends ICreateMode {}

export interface ICreateVisualBalanceModeRequest extends ICreateMode {}
export interface IGetModeRequest {
  type: MODE_TYPE;
}
