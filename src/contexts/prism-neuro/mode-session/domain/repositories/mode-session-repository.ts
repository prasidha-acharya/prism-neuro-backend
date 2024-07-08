import { IModeSessionRequest } from '../interface/mode-session-request.interface';

export interface IModeSessionRepository {
  setModeSession(request: IModeSessionRequest, sessionId: string): Promise<void>;
}
