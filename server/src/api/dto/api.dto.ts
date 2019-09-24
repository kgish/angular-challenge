import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ApiDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly description: string;
}
