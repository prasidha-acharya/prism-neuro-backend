import { MODE_SESSION_STATUS } from '@prisma/client';

export interface ICreateModeSessionRequest {
  modeId?: string;
  patientId: string;
  physioId: string;
  status: MODE_SESSION_STATUS;
}

export interface IGetModeSessionRequest {
  patientId: string;
  physioId: string;
  status: MODE_SESSION_STATUS;
}

export interface IUpdateModeSessionRequest {
  modeId?: string;
  patientId?: string;
  physioId?: string;
  status?: MODE_SESSION_STATUS;
}
