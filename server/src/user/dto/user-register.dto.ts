import { UserBaseDto } from './user-base.dto';
import {IsNotEmpty, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UserRegisterDto extends UserBaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly name: string;
}
