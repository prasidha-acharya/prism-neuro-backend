import { USER_ROLES } from '@prisma/client';
import { IAddress } from './user-request.interface';

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
  address: IAddress[];
  phoneNumber?: string;
  phoneCode?: string;
  userName?: string;
  profileURL?: string;
}

export interface IClientCreatePhysioRequest extends ICommonUserInterface {}

export interface IClientUpdatePhysioRequest extends Omit<ICommonUserInterface, 'email' | 'role' | 'password'> {
  physioId: string;
}

export interface IClientCreatePatientRequest extends ICommonUserInterface {
  age: number;
  weight: number;
  createdBy: string;
}
