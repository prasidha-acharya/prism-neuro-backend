interface ITrials {
  id: string;
  trialId: number;
  result: number | null;
}

export interface IGetModeSessionOfPatientResponse {
  id: string;
  createdAt: Date;
  trials: ITrials[];
}
