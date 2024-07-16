import { USER_ROLES } from '@prisma/client';

export interface IClientLoginRequest {
  email: string;
  password: string;
}

interface ICommonUserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: USER_ROLES;
  address: string;
  phoneNumber?: string;
  phoneCode?: string;
  createdBy: string;
}

export interface IClientCreatePhysioRequest extends ICommonUserInterface {}

export interface IClientCreatePatientRequest extends ICommonUserInterface {
  age: number;
  weight: number;
}
