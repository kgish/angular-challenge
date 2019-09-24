import { IOperator } from './operator.model';

export interface IUser {
  id: string;
  name: string;
  username: string;
  role: string;
  operator: IOperator;
}
