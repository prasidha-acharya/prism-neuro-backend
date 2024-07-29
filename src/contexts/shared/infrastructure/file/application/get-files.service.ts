import { File } from '@prisma/client';
import { IGetFileRequest } from '../domain/interface/file-request.interface';
import { PrismaFileRepository } from '../infrastructure/repositories/prisma-file-repository';

export class GetFilesService {
  constructor(private prismaFileRepository: PrismaFileRepository) {}

  invoke(request: IGetFileRequest): Promise<File[] | null> {
    return this.prismaFileRepository.getFiles(request);
  }
}
