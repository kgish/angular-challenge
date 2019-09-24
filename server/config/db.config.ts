// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT || 5432,
  synchronize: process.env.DB_SYNCHRONIZE ? process.env.DB_SYNCHRONIZE === 'true' : true,
  logging: process.env.DB_LOGGING ? process.env.DB_LOGGING === 'true' : true,
  entities: [__dirname + '/**/*.entity.{ts,js}']
};
