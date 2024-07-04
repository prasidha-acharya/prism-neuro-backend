import { UserRoles } from '@prisma/client';
import { hashPassword } from '../../../../shared/infrastructure/encryptor/encryptor';
import { adminUser } from '../../domain/constant/create-admin';
import { PrismaAdminRepository } from '../repositories/prisma-admin-repository';
export class CreateAdminSeeder {
  constructor(private prismaAdminRepository: PrismaAdminRepository) {}

  public async invoke(): Promise<void> {
    try {
      const isSuperUserExists = await this.prismaAdminRepository.getAdminById(adminUser.email);
      if (!isSuperUserExists) {
        await this.prismaAdminRepository.createAdmin({ ...adminUser, password: hashPassword(adminUser.password), role: UserRoles.ADMIN });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
