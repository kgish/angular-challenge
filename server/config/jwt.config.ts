// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

export default {
  secret: process.env.JWT_SECRET || 'jwtsecret12345!',
  expires: process.env.JWT_EXPIRES || '30m'
};
