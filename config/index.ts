import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import DEV from './environments/dev';
import PROD from './environments/prod';
import TEST from './environments/testing';

dotenv.config();

const { NODE_ENV } = process.env;

export interface Configuration {
  NODE_ENV: string;
  PORT: number;
  APP_NAME: string;
  JWT_EXPIRY: number;
  JWT_REFRESH_EXPIRY: number;
  DATABASE_URL: string;
  APP_LOG_LEVEL: string;
  SALT_ROUNDS: number;
  JWT_SECRET: string;
  BASE_URL: string;
  AWS: AWS;
  MAIL: MailConfiguration;
}

export interface AWS {
  BUCKET_NAME: string;
  REGION: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
}

export interface MailConfiguration {
  HOST: string;
  PORT: number;
  SENDER_ADDRESS: string;
  AUTH_USER: string;
  AUTH_PASS: string;
}

let currentConfig: Configuration = DEV;

switch (NODE_ENV) {
  case 'production':
    currentConfig = PROD;
    break;
  case 'test':
    currentConfig = TEST;
    break;
  default:
    currentConfig = DEV;
}

/* eslint-disable @typescript-eslint/no-var-requires */

export const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: { accessKeyId: process.env.AWS_ACCESS_KEY!, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! }
});

export { currentConfig as config };
