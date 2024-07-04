import { UserRoles } from '@prisma/client';
import { hashPassword } from '../../../../shared/infrastructure/encryptor/encryptor';
import { adminUser } from '../../domain/constant/create-admin';
import { PrismaUserRepository } from '../repositories/prisma-users-repository';
export class CreateAdminSeeder {
  constructor(private prismaUserRepository: PrismaUserRepository) {}

  public async invoke(): Promise<void> {
    try {
      const isSuperUserExists = await this.prismaUserRepository.getAdminByEmail(adminUser.email);
      if (!isSuperUserExists) {
        await this.prismaUserRepository.createAdmin({ ...adminUser, password: hashPassword(adminUser.password), role: UserRoles.ADMIN });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
