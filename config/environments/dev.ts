import { type Configuration } from '../';
import * as dotenv from 'dotenv';

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
  BASE_URL: process.env.BASE_URL || 'localhost:8000'
};

export default DEV;
