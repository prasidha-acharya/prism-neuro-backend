import { ModeSessionStatus } from '@prisma/client';

export interface IModeSessionRequest {
  modeId?: string;
  patientId: string;
  physioId: string;
  status: ModeSessionStatus;
}
