import { ModeSession } from '@prisma/client';
import { ICreateModeSessionRequest, IUpdateModeSessionRequest } from '../interface/mode-session-request.interface';

export interface IModeSessionRepository {
  updateModeSession(request: IUpdateModeSessionRequest, sessionId: string): Promise<void>;
  startModeSession(request: ICreateModeSessionRequest): Promise<ModeSession | null>;
}