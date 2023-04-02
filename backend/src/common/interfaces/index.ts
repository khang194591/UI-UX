import joi from 'src/plugins/joi';

export const BaseQuerySchema = joi.object({
  take: joi.number().positive().optional(),
  skip: joi.number().optional(),
});

export class BaseQueryString {
  take: number;
  skip: number;
}
