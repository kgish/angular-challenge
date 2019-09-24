import { Role } from '../../../user/interfaces';

export interface JwtPayload {
  username: string;
  name: string;
  role: Role;
}
