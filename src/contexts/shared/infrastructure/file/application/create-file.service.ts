import { ICreateFileRequest } from '../domain/interface/file-request.interface';
import { PrismaFileRepository } from '../infrastructure/repositories/prisma-file-repository';

export class CreateFileService {
  constructor(private prismaFileRepository: PrismaFileRepository) {}

  async invoke(request: ICreateFileRequest[]): Promise<void> {
    await this.prismaFileRepository.createFile(request);
  }
}
