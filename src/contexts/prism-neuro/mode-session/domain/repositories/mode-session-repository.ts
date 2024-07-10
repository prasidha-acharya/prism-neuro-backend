import { ICreateModeSessionRequest } from '../interface/mode-session-request.interface';

export interface IModeSessionRepository {
  updateModeSession(request: ICreateModeSessionRequest, sessionId: string): Promise<void>;
  startModeSession(request: ICreateModeSessionRequest): Promise<void>;
}
