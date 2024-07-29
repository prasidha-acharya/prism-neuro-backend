import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Configuration } from 'config';
import { s3ClientBucket } from '../../bucket/s3-client';

export class GetSignedURLService {
  constructor(private config: Configuration) {}

  async invoke(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.config.AWS.BUCKET_NAME,
      Key: key
    });

    return await getSignedUrl(s3ClientBucket, command, { expiresIn: 3600 });
  }
}
