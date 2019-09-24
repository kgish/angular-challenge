import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ApiEntity } from './api.entity';
// import { ScenarioEntity } from '../scenario/scenario.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([ApiEntity, SceanrioEntity])],
  imports: [TypeOrmModule.forFeature([ApiEntity])],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
