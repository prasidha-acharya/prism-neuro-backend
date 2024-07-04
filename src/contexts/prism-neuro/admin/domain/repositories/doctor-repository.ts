import { ICreateDoctorRequest } from '../interface/create-doctor';

export interface IDoctorRepository {
  createDoctor(request: ICreateDoctorRequest): Promise<void>;
}
