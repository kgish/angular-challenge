import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApiDto } from './dto/api.dto';
import { ApiEntity } from './api.entity';

// import { ScenarioEntity } from '../scenario/scenario.entity';

@Injectable()
export class ApiService {

  constructor(
    @InjectRepository(ApiEntity)
    private apiRepository: Repository<ApiEntity>) {
    // @InjectRepository(ScenarioEntity)
    // private scenarioRepository: Repository<SceanrioEntity>) {
  }

  async create(data: ApiDto): Promise<ApiEntity> {
    const api = await this.apiRepository.create(data);
    await this.apiRepository.save(api);
    return api;
  }

  async findAll(): Promise<ApiEntity[]> {
    // return await this.apiRepository.find({ relations: [ 'scenarios' ] });
    return await this.apiRepository.find();
  }

  async findOne(id: string): Promise<ApiEntity> {
    // const api = await this.apiRepository.findOne({ where: { id }, relations: [ 'users' ] });
    const api = await this.apiRepository.findOne();
    if (!api) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return api;
  }

  async update(id: string, data: Partial<ApiDto>): Promise<ApiEntity> {
    let api = await this.apiRepository.findOne({ where: { id } });
    if (!api) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.apiRepository.update({ id }, data);
    api = await this.apiRepository.findOne({ where: { id } });
    return api;
  }

  async delete(id: string): Promise<any> {
    const api = await this.apiRepository.findOne({ where: { id } });
    if (!api) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.apiRepository.delete({ id });
    return api;
  }
}
