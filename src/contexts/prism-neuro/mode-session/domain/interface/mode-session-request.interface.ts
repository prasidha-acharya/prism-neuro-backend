import { MODE_SESSION_STATUS } from '@prisma/client';

export interface IModeSessionRequest {
  modeId?: string;
  patientId: string;
  physioId: string;
  status: MODE_SESSION_STATUS;
}
