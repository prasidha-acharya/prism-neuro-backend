import { MODE_TYPE } from '@prisma/client';

interface ICreateMode {
  type: MODE_TYPE;
  trialCount: number;
  name: string;
}

export interface ICreateBalanceModeRequest extends ICreateMode {
  trialDuration: number;
}

export interface ICreateTargetModeRequest extends ICreateMode {
  trialDuration: number;
}

export interface ICreateLeftRightMode extends ICreateMode {}

export interface ICreateVisualBalanceModeRequest extends ICreateMode {}
export interface IGetModeByTypeRequest {
  type: MODE_TYPE;
}

export interface IGetModeByIdRequest {
  modeId: string;
}

export interface IGetAllModesRequest {
  startDate?: Date;
  endDate?: Date;
  physioId?: string;
  patientId?: string;
}
