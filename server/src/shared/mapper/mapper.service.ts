import { Injectable } from '@nestjs/common';
import 'automapper-ts/dist/automapper';

@Injectable()
export class MapperService {
  mapper: AutoMapperJs.AutoMapper;

  constructor() {
    this.mapper = automapper;
    this.initializeMapper();
  }

  private initializeMapper(): void {
    this.mapper.initialize(MapperService.configure);
  }

  private static configure(config: AutoMapperJs.IConfiguration): void {
    config
      .createMap('User', 'UserRO')
      .forSourceMember('id', opts => opts.ignore())
      .forSourceMember('username', opts => opts.ignore())
      .forSourceMember('name', opts => opts.ignore())
      .forSourceMember('role', opts => opts.ignore())
      .forSourceMember('created', opts => opts.ignore())
      .forSourceMember('updated', opts => opts.ignore());
  }
}
