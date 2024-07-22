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
    profileURL: string | null;
  };
  trials: ITrials[];
  session: number;
}
