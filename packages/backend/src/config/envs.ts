import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'local';

export const envs = {
  ...process.env,
  ...dotenv.config({ path: '.env' }).parsed,
  ...dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed,
};
