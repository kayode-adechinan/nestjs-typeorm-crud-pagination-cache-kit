import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import * as dotenv from 'dotenv';
dotenv.config();

const configDevelopment: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

const configTest: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'dbtest',
  entities: ['./**/*.entity.ts'],
  synchronize: true,
  dropSchema: true,
};

const sqliteConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'database',
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

let config: SqliteConnectionOptions | PostgresConnectionOptions = sqliteConfig;

if (process.env.DB_TYPE) {
  config = pgConfig;
}
export default config;
