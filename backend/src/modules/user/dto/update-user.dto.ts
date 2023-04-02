import { ApiProperty } from '@nestjs/swagger';
import joi from 'src/plugins/joi';
import { INPUT_MAX_LENGTH } from '../../../common/constants';
import { UserStatus } from '@prisma/client';

export const UpdateUserSchema = joi.object({
  email: joi.string().email().max(INPUT_MAX_LENGTH).optional(),
  name: joi.string().min(3).max(INPUT_MAX_LENGTH).optional(),
  status: joi.string().optional(),
  roleId: joi.number().optional(),
});

export class UpdateUserDto {
  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  name: string;

  updaterId: number;

  @ApiProperty({ required: false })
  status: UserStatus;

  @ApiProperty({ required: false })
  roleId: number;
}
