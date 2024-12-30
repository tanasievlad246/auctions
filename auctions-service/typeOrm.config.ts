import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig({
  path: './.env',
});

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV !== 'production',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['migrations/*.{ts,js}'],
};

export default new DataSource(config);