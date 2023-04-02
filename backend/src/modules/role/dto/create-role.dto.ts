import { ApiProperty } from '@nestjs/swagger';
import joi from 'src/plugins/joi';
import { INPUT_MAX_LENGTH } from '../../../common/constants';

export const CreateRoleSchema = joi.object({
  name: joi.string().max(INPUT_MAX_LENGTH).required(),
  description: joi.string().max(INPUT_MAX_LENGTH).optional(),
  permissions: joi.array().items(joi.number()).optional(),
});

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    required: true,
    description: 'Tên của role',
  })
  name: string;

  @ApiProperty({
    example: 'Quản trị viên',
    required: false,
    description: 'Mô tả cụ thể về role',
  })
  description: string;

  @ApiProperty({
    example: [1, 2, 3, 4, 5, 6, 7, 8],
    type: [Number],
    required: false,
    description: 'Danh sách ID các quyền của role',
  })
  permissions: number[];
}
