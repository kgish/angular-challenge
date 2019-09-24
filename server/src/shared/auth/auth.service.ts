import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { sign, SignOptions } from 'jsonwebtoken';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../../user/user.service';
import { Role, UserRO } from '../../user/interfaces';

@Injectable()
export class AuthService {

  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  logger: Logger;

  constructor(
    @Inject(forwardRef(() => UserService))
    readonly userService: UserService) {
    this.logger = new Logger('AuthService');
    this.jwtOptions = { expiresIn: process.env.JWT_EXPIRES || '30m' };
    this.jwtKey = process.env.JWT_SECRET || 'jwtsecret12345!';
    this.logger.log(`constructor() ${JSON.stringify({ jwtKey: this.jwtKey, jwtOptions: this.jwtOptions })}`);
  }

  async createToken() {
    const payload: JwtPayload = { username: 'zappb', name: 'Zapp Brannigan', role: Role.user };
    const expiresIn = this.jwtOptions.expiresIn;
    const accessToken = sign(payload, this.jwtKey, this.jwtOptions);
    const result = { expiresIn, accessToken };
    this.logger.log(`createToken() payload='${JSON.stringify(payload)}' => ${result}`);
    return result;
  }

  async validateUser(payload: JwtPayload): Promise<UserRO> {
    const result = this.userService.findOneUsername(payload.username);
    this.logger.log(`validateUser() payload='${JSON.stringify(payload)}' => ${JSON.stringify(result)}`);
    return result;
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    const result = sign(payload, this.jwtKey, this.jwtOptions);
    this.logger.log(`signPayload() payload='${JSON.stringify(payload)}' => ${result}`);
    return result;
  }
}
