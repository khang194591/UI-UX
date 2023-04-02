import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { value: convertedValue, error } = this.schema.validate(value, {
      convert: true,
      stripUnknown: true,
    });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return convertedValue;
  }
}
