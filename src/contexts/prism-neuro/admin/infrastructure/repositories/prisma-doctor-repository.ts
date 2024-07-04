import { ICreateDoctorRequest } from '../../domain/interface/create-doctor';

export interface IPrismaDoctorRepository {
  createDoctor(request: ICreateDoctorRequest): Promise<void>;
}
