export enum TokenScope {
  REFRESH = 'refresh',
  CUSTOMER_ACCESS = 'customer:access',
  ADMIN_ACCESS = 'admin:access'
}

export interface Payload {
  user_id: string;
  // session_id: string;
  email: string;
  scope: TokenScope[];
  role: string;
}
