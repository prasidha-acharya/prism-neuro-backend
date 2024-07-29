import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Configuration } from 'config';
import { s3ClientBucket } from '../../bucket/s3-client';

export class DeleteFileFromBucketService {
  constructor(private config: Configuration) {}

  async invoke(key: string): Promise<void> {
    const input = {
      Bucket: this.config.AWS.BUCKET_NAME,
      Key: key
    };
    const deleteObject = new DeleteObjectCommand(input);

    await s3ClientBucket.send(deleteObject);
  }
}
