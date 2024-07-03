import { UserRoles } from '@prisma/client';
import { ICreateAdmin } from './create-admin';

export interface ICreateDoctorRequest extends ICreateAdmin {
  role: UserRoles;
  firstName: string;
  lastName: string;
}
