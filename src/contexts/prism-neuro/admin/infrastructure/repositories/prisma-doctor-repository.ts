import { PrismaClient } from '@prisma/client';
import { ICreateDoctorRequest } from '../../domain/interface/create-doctor';
import { IDoctorRepository } from '../../domain/repositories/doctor-repository';

export class PrismaDoctorRepository implements IDoctorRepository {
  constructor(private db: PrismaClient) {}

  async createDoctor(request: ICreateDoctorRequest): Promise<void> {
    const { address, ...remainigRequest } = request;
    await this.db.user.create({
      data: {
        ...remainigRequest,
        UserDetail: {
          create: {
            address
          }
        }
      }
    });
  }
}
