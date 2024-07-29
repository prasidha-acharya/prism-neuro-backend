import { File } from '@prisma/client';
import { GetSignedURLService } from '../file/application/get-signed-url.service';

export class FileTransformer {
  constructor(private getSignedURLService: GetSignedURLService) {}

  async invoke(files: File[]): Promise<string[]> {
    const data = files.map(file => {
      return this.getSignedURLService.invoke(file.url);
    });
    return await Promise.all(data);
  }
}
