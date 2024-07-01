import { type Configuration } from '..';

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
};

export default TEST;
