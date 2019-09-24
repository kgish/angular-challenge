import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {

    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException('Validation failed: empty body', HttpStatus.BAD_REQUEST);
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  private formatErrors(errors: any[]): string {
    return errors.map(err => {
      const constraints = err.constraints;
      for (const property in constraints) {
        if (constraints.hasOwnProperty(property)) {
          return constraints[property];
        }
      }
    }).join(', ');
  }

  private isEmpty(value: any): boolean {
    if (value && Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }
}
