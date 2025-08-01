import { DataSource } from 'typeorm';
import configuration from '@/config/configuration';

const dataSourceConfig = configuration().getDataSourceConfig();
export const dataSource = new DataSource(dataSourceConfig);
