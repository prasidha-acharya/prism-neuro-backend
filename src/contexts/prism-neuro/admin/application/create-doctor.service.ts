import { ICreateDoctorRequest } from '../domain/interface/create-doctor';
import { PrismaDoctorRepository } from '../infrastructure/repositories/prisma-doctor-repository';

export class CreateDoctorService {
  constructor(private prismaDoctorRepository: PrismaDoctorRepository) {}

  public async invoke(request: ICreateDoctorRequest): Promise<void> {
    await this.prismaDoctorRepository.createDoctor(request);
  }
}
