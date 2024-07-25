import { MODE_SESSION_STATUS, ModeSession, ModeTrialSession } from '@prisma/client';
import { IPrismaUserResponse } from 'src/contexts/prism-neuro/users/domain/interface/user.response.interface';

export interface ICreateModeSessionRequest {
  modeId?: string;
  patientId: string;
  physioId: string;
  status: MODE_SESSION_STATUS;
}

export interface IGetModeSessionRequest {
  id?: string; //modeSessionId
  patientId?: string;
  physioId?: string;
  status: MODE_SESSION_STATUS;
}

export interface IUpdateModeSessionRequest {
  modeId?: string;
  patientId?: string;
  physioId?: string;
  status?: MODE_SESSION_STATUS;
}

export interface IGetModeTrialsOfPatientRequest {
  modeId?: string;
  patientId?: string;
  physioId?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  page?: number;
}

export interface IPrismaModeSessionRequest extends ModeSession {
  modeTrialSession: ModeTrialSession[];
  physio: IPrismaUserResponse;
  patient: IPrismaUserResponse;
}
