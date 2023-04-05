import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatabaseService } from 'src/common/services/database.service';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from 'src/common/pipes/joi.validation.pipe';
import { LoginDto, LoginSchema } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private db: DatabaseService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UsePipes(new JoiValidationPipe(LoginSchema))
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request, @Body() data: LoginDto) {
    return req.user;
  }
}
