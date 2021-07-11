import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ConnectionOptions } from 'typeorm';

import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

dotenv.config({
  path: path.join(dirName, '../../.env')
});

const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE = 'true',
  SALT,
} = process.env;
export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
};

const DEFAULT_SALT = 10;

export const DB_SALT = Number(SALT) || DEFAULT_SALT;

export const DB_PORT = Number(PORT);

export const TOKEN_EXP = 60 * 60 * 24;

export const DB_CONFIG = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [User, Board, Task],
  synchronize: false,
  migrations: ['../migration/*.ts'],
  cli: {
    migrationsDir: '../migration',
  },
} as ConnectionOptions;
