export interface ITrials {
  id: string;
  trialId: number;
  result: number | null;
}

export interface IGetModeSessionOfPatientResponse {
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
