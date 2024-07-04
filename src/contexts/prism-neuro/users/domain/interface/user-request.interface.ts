import { UserRoles } from '@prisma/client';

export interface ICreateAdmin {
  email: string;
  password: string;
  userName: string;
  address: string;
}

export interface ICreateAdminRequest extends ICreateAdmin {
  role: UserRoles;
}

export interface ICreateDoctorRequest extends ICreateAdmin {
  role: UserRoles;
  firstName: string;
  lastName: string;
}

export interface ICreatePatientRequest extends ICreateAdmin {
  role: UserRoles;
  firstName: string;
  lastName: string;
}
