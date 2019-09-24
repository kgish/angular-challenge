import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserBaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string;
}
