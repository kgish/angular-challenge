import { Role } from './user-role.enum';

export interface User {
  readonly username: string;
  readonly name: string;
  readonly password: string;
  readonly role: Role;
}
