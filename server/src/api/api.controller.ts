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

import { ApiService } from './api.service';
import { ApiEntity } from './api.entity';
import { ApiDto } from './dto/api.dto';

import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { ApiException } from '../shared/api-exception';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../user/interfaces';
import { RolesGuard } from '../shared/guards/roles.guard';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../shared/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiUseTags('apis')
@Controller('apis')
export class ApiController {

  private logger = new Logger('ApiController');

  constructor(private apiService: ApiService) {
  }

  @Post()
  @Roles(Role.admin)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: ApiEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(ApiEntity.modelName, 'Create'))
  create(@Body() data: ApiDto): Promise<ApiEntity> {
    this.logger.log(JSON.stringify(data));
    return this.apiService.create(data);
  }

  @Get()
  @Roles(Role.admin, Role.support)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @ApiOkResponse({ type: ApiEntity, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(ApiEntity.modelName, 'GetAll'))
  findAll(): Promise<ApiEntity[]> {
    return this.apiService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.support)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @ApiOkResponse({ type: ApiEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(ApiEntity.modelName, 'GetOne'))
  findOne(@Param('id') id: string): Promise<ApiEntity> {
    return this.apiService.findOne(id);
  }

  @Put()
  @Roles(Role.admin, Role.support)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ type: ApiEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(ApiEntity.modelName, 'GetOne'))
  @ApiOperation(GetOperationId(ApiEntity.modelName, 'Update'))
  update(@Param('id') id: string, @Body() data: Partial<ApiDto>) {
    this.logger.log(JSON.stringify(data));
    return this.apiService.update(id, data);
  }

  @Delete()
  @Roles(Role.admin)
  @UseGuards(new JwtAuthGuard(), RolesGuard)
  @ApiOkResponse({ type: ApiEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(ApiEntity.modelName, 'Delete'))
  delete(@Param('id') id: string) {
    return this.apiService.delete(id);
  }
}
