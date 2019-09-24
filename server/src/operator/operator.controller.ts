import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put, UseGuards,
  UsePipes,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { OperatorService } from './operator.service';
import { OperatorEntity } from './operator.entity';
import { OperatorDto } from './dto/operator.dto';

import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { ApiException } from '../shared/api-exception';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../user/interfaces';
import { RolesGuard } from '../shared/guards/roles.guard';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../shared/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiUseTags('operators')
@Controller('operators')
export class OperatorController {

  private logger = new Logger('OperatorController');

  constructor(private operatorService: OperatorService) {
  }

  @Post()
  @Roles(Role.admin)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: OperatorEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'Create'))
  create(@Body() data: OperatorDto): Promise<OperatorEntity> {
    this.logger.log(JSON.stringify(data));
    return this.operatorService.create(data);
  }

  @Get()
  @Roles(Role.admin, Role.support)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @ApiOkResponse({ type: OperatorEntity, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'GetAll'))
  findAll(): Promise<OperatorEntity[]> {
    return this.operatorService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.support)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @ApiOkResponse({ type: OperatorEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'GetOne'))
  findOne(@Param('id') id: string): Promise<OperatorEntity> {
    return this.operatorService.findOne(id);
  }

  @Put()
  @Roles(Role.admin, Role.support)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ type: OperatorEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'GetOne'))
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'Update'))
  update(@Param('id') id: string, @Body() data: Partial<OperatorDto>) {
    this.logger.log(JSON.stringify(data));
    return this.operatorService.update(id, data);
  }

  @Delete()
  @Roles(Role.admin)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @ApiOkResponse({ type: OperatorEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'Delete'))
  delete(@Param('id') id: string) {
    return this.operatorService.delete(id);
  }
}
