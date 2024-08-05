import { MODE_TRIAL_SESSION_STATUS, MODE_TYPE, ModeSession, ModeTrialSession } from '@prisma/client';

export interface ITrials {
  id: string;
  trialId: number;
  result: number | null;
}

export interface IGetModeSessionOfPatientResponse {
  session: number;
  id: string;
  createdAt: Date;
  trials: ITrials[];
}

export interface IGetPatientsModeSessionByPhysioResponse {
  id: string;
  createdAt: Date;
  user: {
    fullName: string;
    id: string;
    // profileURL: string | null;
  };
  trials: ITrials[];
  session: number;
}

interface IUserDetail {
  fullName: string;
  id: string;
}

export interface IGetPatientsActivityResponse {
  id: string;
  createdAt: Date;
  patient: IUserDetail;
  email: string;
  isVerified: boolean;
  physioTherapist: IUserDetail | null;
  session: number;
}

export interface IPrismaModeSessionOfPhysioAndPatientReponse extends ModeSession {
  modeTrialSession: ModeTrialSession[];
}

export interface IGetModesDetailForDashBoardResponse {
  id: string;
  type: MODE_TYPE;
  name: string;
  instructions: string[];
  images: string[];
}

interface IModeTrialSession {
  id: string;
  trialId: number;
  startTime: Date | null;
  endTime: Date | null;
  status: MODE_TRIAL_SESSION_STATUS | null;
  createdAt: Date;
  results: number | null;
}

export interface IGetModesDetailForTabletResponse {
  id: string;
  type: MODE_TYPE;
  name: string;
  trialCount: number;
  instructions: string[];
  modeTrialSession: IModeTrialSession[];
  trialDuration: number | null;
}
