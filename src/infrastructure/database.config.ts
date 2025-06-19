import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
};
