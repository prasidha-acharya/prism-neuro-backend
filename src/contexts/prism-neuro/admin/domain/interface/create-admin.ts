import { UserRoles } from '@prisma/client';

export interface ICreateAdmin {
  email: string;
  password: string;
  userName: string;
  address: string;
}

export interface ICreateAdminRequest extends ICreateAdmin {
  id: string;
  role: UserRoles;
}
