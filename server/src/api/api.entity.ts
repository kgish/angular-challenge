import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../shared/base.entity';

@Entity('operator')
export class ApiEntity extends BaseEntity {

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
