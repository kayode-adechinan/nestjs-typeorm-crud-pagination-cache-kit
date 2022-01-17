import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DBNAME,
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

//const config = process.env.NODE_ENV === 'test' ? configTest : configDevelopment;

export default config;
