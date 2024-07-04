import { ICreateAdminRequest } from '../interface/create-admin';

export interface IDoctorRepository {
  createAdmin(request: ICreateAdminRequest): Promise<void>;
}
