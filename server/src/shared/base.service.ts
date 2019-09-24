// import 'automapper-ts/dist/automapper';
import { BaseEntity } from './base.entity';
import { Repository } from 'typeorm';

export class BaseService<T extends BaseEntity> {

  constructor(public repository: Repository<T>) {
  }

  // async map<K>(
  //   object: Partial<InstanceType<T>> | Partial<InstanceType<T>>[],
  //   sourceKey: string = this.modelName,
  //   destinationKey: string = this.viewModelName,
  // ): Promise<K> {
  //   return this._mapper.map(sourceKey, destinationKey, object);
  // }

  // async create(item: InstanceType<T>): Promise<InstanceType<T>> {
  //   return this.repository.create(item);
  // }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(): Promise<T> {
    return this.repository.findOne();
  }

  // async findById(id: string): Promise<T> {
  //   return this.repository.findById(this.toObjectId(id)).exec();
  // }
  //
  // async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
  //   return this.repository.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
  // }
  //
  // async delete(id: string): Promise<InstanceType<T>> {
  //   return this.repository.findByIdAndRemove(this.toObjectId(id)).exec();
  // }

}
