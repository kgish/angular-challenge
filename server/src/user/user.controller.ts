import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiCreatedResponse, ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserLoginDto, UserRegisterDto } from './dto';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { ApiException } from '../shared/api-exception';
import { UserEntity } from './user.entity';
import { UserRO } from './interfaces';
import { UserLoginRO } from './interfaces/user-login-ro.interface';
import { UserRegisterRO } from './interfaces/user-register-ro.interface';

@Controller()
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get('users')
  @ApiUseTags('users')
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get('users/:id')
  @ApiUseTags('users')
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<UserRO> {
    return this.userService.findOne(id);
  }

  @Post('register')
  @ApiUseTags('auth')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: UserRegisterDto })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(UserEntity.modelName, 'Register'))
  register(@Body() data: UserRegisterDto): Promise<UserRegisterRO> {
    return this.userService.register(data);
  }

  @Post('login')
  @ApiUseTags('auth')
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: UserLoginDto })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(UserEntity.modelName, 'Login'))
  login(@Body() data: UserLoginDto): Promise<UserLoginRO> {
    return this.userService.login(data);
  }
}
