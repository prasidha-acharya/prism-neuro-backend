export enum TokenScope {
  REFRESH = 'refresh',
  PATIENT_ACCESS = 'patient:access',
  PHYSIO_ACCESS = 'physio:access',
  ADMIN_ACCESS = 'admin:access'
}

export interface Payload {
  user_id: string;
  session_id: string;
  email: string;
  scopes: TokenScope[];
  role: string;
}
