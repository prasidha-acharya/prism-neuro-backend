// create s3 client with credentials

import { config } from '../../../../../config/index';

import { S3Client } from '@aws-sdk/client-s3';

const { AWS } = config;

console.log(config.AWS);

export const s3Client = new S3Client({
  region: AWS.REGION,
  credentials: {
    accessKeyId: AWS.ACCESS_KEY_ID,
    secretAccessKey: AWS.SECRET_ACCESS_KEY
  }
});
