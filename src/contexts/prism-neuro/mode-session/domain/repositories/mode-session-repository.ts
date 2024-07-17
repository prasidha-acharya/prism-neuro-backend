import { ModeSession } from '@prisma/client';
import {
  ICreateModeSessionRequest,
  IGetModeSessionRequest,
  IGetModeTrialsOfPatientRequest,
  IUpdateModeSessionRequest
} from '../interface/mode-session-request.interface';

export interface IModeSessionRepository {
  updateModeSession(request: IUpdateModeSessionRequest, sessionId: string): Promise<void>;
  startModeSession(request: ICreateModeSessionRequest): Promise<ModeSession | null>;
  getModeSessionOfPhysioAndPatient(request: IGetModeSessionRequest): Promise<ModeSession | null>;
  getModeTrialsOfPatient(request: IGetModeTrialsOfPatientRequest): Promise<any | null>;
}
