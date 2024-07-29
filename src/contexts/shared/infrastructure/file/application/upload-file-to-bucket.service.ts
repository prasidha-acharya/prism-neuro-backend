import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Configuration } from 'config';
import { s3ClientBucket } from '../../bucket/s3-client';
import { GetSignedURLService } from './get-signed-url.service';

export class UploadFileToBucketService {
  constructor(
    private config: Configuration,
    private getSignedURLService: GetSignedURLService
  ) {}

  async invoke(key: string, file: Express.Multer.File): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.config.AWS.BUCKET_NAME,
      Key: key,
      Body: file?.buffer,
      ContentType: file?.mimetype
    });
    await s3ClientBucket.send(command);

    return key;

    // return this.getSignedURLService.invoke(key);
  }
}
