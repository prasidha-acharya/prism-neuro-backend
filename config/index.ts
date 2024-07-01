import DEV from './environments/dev';
import PROD from './environments/prod';
import TEST from './environments/testing';
import * as dotenv from 'dotenv';

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

export { currentConfig as config };
