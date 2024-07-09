import * as dotenv from 'dotenv';
import { type Configuration } from '../';

dotenv.config();

const PROD: Configuration = {
  JWT_SECRET: process.env.JWT_SECRET_TOKEN || '',
  JWT_EXPIRY: Number(process.env.JWT_EXPIRY) || 3600,
  JWT_REFRESH_EXPIRY: Number(process.env.JWT_REFRESH_EXPIRY) || 7200,
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: +(process.env.PORT || 8000),
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS || '10'),
  APP_NAME: process.env.APP_NAME || 'Prism Neuro',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://webandapp:webandapp@127.0.0.1/campus_plus',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'info',
  BASE_URL: process.env.BASE_URL || '',
  MAIL: {
    AUTH_PASS: process.env.MAIL_AUTH_PASS || '',
    AUTH_USER: process.env.MAIL_AUTH_USER || '',
    HOST: process.env.MAIL_HOST || '',
    PORT: Number(process.env.MAIL_PORT) || 587,
    SENDER_ADDRESS: process.env.MAIL_SENDER_ADDRESS || ''
  }
};

export default PROD;
