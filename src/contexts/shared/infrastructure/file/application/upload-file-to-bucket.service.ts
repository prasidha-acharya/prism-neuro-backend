import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Configuration } from 'config';
import { s3ClientBucket } from '../../bucket/s3-client';
import { IFileUploadResponse } from '../domain/interface/file-request.interface';
import { GetSignedURLService } from './get-signed-url.service';

export class UploadFileToBucketService {
  constructor(
    private config: Configuration,
    private getSignedURLService: GetSignedURLService
  ) {}

  async invoke(key: string, file: Express.Multer.File): Promise<IFileUploadResponse> {
    const command = new PutObjectCommand({
      Bucket: this.config.AWS.BUCKET_NAME,
      Key: key,
      Body: file?.buffer,
      ContentType: file?.mimetype
    });
    await s3ClientBucket.send(command);

    const url = await this.getSignedURLService.invoke(key);
    return { key, url };
  }
}
