// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

export default {
  host: process.env.API_HOST || 'http://localhost',
  port: process.env.API_PORT || 3000,
  prefix: process.env.API_PREFIX || 'api/v1'
};
