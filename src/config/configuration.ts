import { join } from 'path';
import * as process from 'process';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => ({
  isProd: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '3000', 10),
  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres' as const,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: false,
    };
  },
  getDataSourceConfig(): DataSourceOptions {
    return {
      type: 'postgres' as const,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
      synchronize: process.env.NODE_ENV !== 'production',
    };
  },
});
