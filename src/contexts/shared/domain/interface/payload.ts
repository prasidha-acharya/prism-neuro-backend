export enum TokenScope {
  REFRESH = 'refresh',
  USER_ACCESS = 'user:access',
  ADMIN_ACCESS = 'admin:access'
}

export interface Payload {
  user_id: string;
  session_id: string;
  email: string;
  scopes: TokenScope[];
  role: string;
}
