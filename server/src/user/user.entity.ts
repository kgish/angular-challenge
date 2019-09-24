import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';

import { UserRO, Role } from './interfaces';
import { OperatorEntity } from '../operator/operator.entity';
import { BaseEntity } from '../shared/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {

  @Column({type: 'text', unique: true})
  username: string;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text'})
  password: string;

  @Column()
  role: Role;

  @ManyToOne(type => OperatorEntity, operator => operator.users)
  operator: OperatorEntity;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  toResponseObject(): UserRO {
    const {id, username, name, role, created, updated} = this;
    const userRO: UserRO = {id, username, name, role, created, updated};
    return userRO;
  }

  async comparePassword(attempt: string) {
    const result = await compare(attempt, this.password);
    return result;
  }

  static get modelName(): string {
    return 'User';
  }
}
