import {
  ExecutionContext,
  Injectable, Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppModule } from '../../../app.module';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  logger: Logger;

  constructor() {
    super();
    this.logger = new Logger('JwtAuthGuard');
    this.logger.log('constructor()');
  }

  canActivate(context: ExecutionContext) {
    const authEnabled = AppModule.authEnabled;
    this.logger.log(`canActivate() authEnabled='${authEnabled}'`);
    return authEnabled ? super.canActivate(context) : true;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      const parms = [];
      if (err) {
        parms.push(`err='${err}'`);
      }
      if (user) {
        parms.push(`user='${JSON.stringify(user)}'`);
      }
      if (info) {
        parms.push(`info='${info}'`);
      }
      this.logger.error(`handleRequest() ${parms.join(', ')}`);
      throw err || new UnauthorizedException();
    }
    this.logger.log(`handleRequest() => '${JSON.stringify(user)}'`);
    return user;
  }
}
