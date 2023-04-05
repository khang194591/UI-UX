import { ApiProperty } from '@nestjs/swagger';
import { INPUT_MAX_LENGTH, SECURITY_PATTERN } from '../../../common/constants';
import joi from 'src/plugins/joi';

export const LoginSchema = joi.object({
  email: joi.string().email().max(INPUT_MAX_LENGTH).required(),
  password: joi.string().regex(SECURITY_PATTERN).required(),
});

export class LoginDto {
  @ApiProperty({ examples: ['admin@admin.com', 'user@user.com'] })
  email: string;

  @ApiProperty({ examples: ['admin@123', 'user@123'] })
  password: string;
}
