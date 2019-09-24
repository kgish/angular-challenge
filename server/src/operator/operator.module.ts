import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';
import { OperatorEntity } from './operator.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperatorEntity, UserEntity])],
  controllers: [OperatorController],
  providers: [OperatorService]
})
export class OperatorModule {}
