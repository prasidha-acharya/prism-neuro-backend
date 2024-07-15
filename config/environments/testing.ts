import * as dotenv from 'dotenv';
import { type Configuration } from '..';

dotenv.config();

const TEST: Configuration = {
  NODE_ENV: 'test',
  PORT: 4000,
  JWT_SECRET: process.env.JWT_SECRET_TOKEN || '',
  JWT_EXPIRY: Number(process.env.JWT_EXPIRY) || 3600,
  JWT_REFRESH_EXPIRY: Number(process.env.JWT_REFRESH_EXPIRY) || 7200,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS || '10'),
  APP_NAME: 'Test Prism Neuro Application',
  DATABASE_URL: 'postgresql://webandapp:webandapp@127.0.0.1/campus_plus',
  APP_LOG_LEVEL: 'debug',
  BASE_URL: process.env.BASE_URL || '',
  MAIL: {
    AUTH_PASS: process.env.MAIL_AUTH_PASS || '',
    AUTH_USER: process.env.MAIL_AUTH_USER || '',
    HOST: process.env.MAIL_HOST || '',
    PORT: Number(process.env.MAIL_PORT) || 587,
    SENDER_ADDRESS: process.env.MAIL_SENDER_ADDRESS || ''
  },
  AWS: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID || '',
    BUCKET_NAME: process.env.BUCKET_NAME || '',
    REGION: process.env.REGION || '',
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || ''
  }
};

export default TEST;
