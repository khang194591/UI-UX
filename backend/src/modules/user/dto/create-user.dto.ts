import { ApiProperty } from '@nestjs/swagger';
import joi from 'src/plugins/joi';
import { INPUT_MAX_LENGTH } from '../../../common/constants';
import { UserStatus } from '@prisma/client';

export const CreateUserSchema = joi.object({
  email: joi.string().email().max(INPUT_MAX_LENGTH).required(),
  name: joi.string().max(INPUT_MAX_LENGTH).optional(),
  roleId: joi.number().positive().optional(),
  status: joi.string().optional(),
  accountId: joi.number().positive().optional(),
});

export class CreateUserDto {
  @ApiProperty({ example: 'khang194591@gmail.com', required: true })
  email: string;

  @ApiProperty({ example: 'Trịnh Đức Khang', required: false })
  name: string;

  @ApiProperty({ required: false })
  status: UserStatus;

  @ApiProperty({ required: false })
  accountId: number;

  @ApiProperty({ required: false })
  roleId: number;
}
