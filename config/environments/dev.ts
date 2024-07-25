import * as dotenv from 'dotenv';
import { type Configuration } from '../';

dotenv.config();

const DEV: Configuration = {
  NODE_ENV: 'development',
  JWT_SECRET: process.env.JWT_SECRET_TOKEN || '',
  JWT_EXPIRY: Number(process.env.JWT_EXPIRY) || 900,
  JWT_REFRESH_EXPIRY: Number(process.env.JWT_REFRESH_EXPIRY) || 1200,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS || '10'),
  PORT: +(process.env.PORT || 8000),
  APP_NAME: process.env.APP_NAME || 'Dev Prism Neuro',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://webandapp:webandapp@127.0.0.1/capital_remit',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'debug',
  BASE_URL: process.env.BASE_URL || 'localhost:8000',
  MAIL: {
    AUTH_PASS: process.env.MAIL_AUTH_PASS || '',
    AUTH_USER: process.env.MAIL_AUTH_USER || '',
    HOST: process.env.MAIL_HOST || '',
    PORT: Number(process.env.MAIL_PORT) || 587,
    SENDER_ADDRESS: process.env.MAIL_SENDER_ADDRESS || ''
  },
  AWS: {
    ACCESS_KEY_ID: process.env.S3_BUCKET_ACCESS_KEY_ID || '',
    BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
    REGION: process.env.S3_BUCKET_REGION || '',
    SECRET_ACCESS_KEY: process.env.S3_BUCKET_SECRET_ACCESS_KEY || ''
  }
};

export default DEV;
