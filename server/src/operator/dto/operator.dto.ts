import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class OperatorDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly name: string;
}
