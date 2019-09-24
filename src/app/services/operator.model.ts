import { IUser } from './user.model';

export interface IOperator {
  id: string;
  code: string;
  name: string;
  users: IUser[];
}
