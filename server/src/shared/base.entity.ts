import { BaseEntity as _BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class BaseEntity extends _BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiModelPropertyOptional()
  id?: string;

  @CreateDateColumn()
  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  created?: Date;

  @UpdateDateColumn()
  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  updated?: Date;
}
