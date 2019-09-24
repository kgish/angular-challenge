import {
  Column,
  Entity,
  OneToMany
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../shared/base.entity';
import { UserRO } from '../user/interfaces';

@Entity('operator')
export class OperatorEntity extends BaseEntity {

  // constructor() {
  //   super();
  // }

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(type => UserEntity, user => user.operator)
  users: UserEntity[];

  static get modelName(): string {
    return 'Operator';
  }
}
