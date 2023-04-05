import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PermissionAction, PermissionResource } from '@prisma/client';
import { Response } from 'express';
import { BEARER } from 'src/common/constants';
import {
  AuthorizationGuard,
  PermissionsData,
} from 'src/common/guards/authorization.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { BaseQuerySchema, BaseQueryString } from 'src/common/interfaces';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { DatabaseService } from '../../common/services/database.service';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSchema } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtGuard, AuthorizationGuard)
@ApiTags('users')
@ApiBearerAuth(BEARER)
export class UserController {
  constructor(
    private readonly db: DatabaseService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @PermissionsData(`${PermissionResource.USER}-${PermissionAction.R}`)
  @ApiQuery({ name: 'skip', type: Number, example: 0 })
  @ApiQuery({ name: 'take', type: Number, example: 5 })
  async getAll(
    @Query(new JoiValidationPipe(BaseQuerySchema)) query: BaseQueryString,
    @Res() res: Response,
  ) {
    try {
      const users = await this.db.user.findMany({
        take: query.take,
        skip: query.skip,
        include: {
          role: true,
        },
      });
      const count = await this.db.user.count();
      return res.json({
        items: users,
        totalItems: count,
      });
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @PermissionsData(`${PermissionResource.USER}-${PermissionAction.R}`)
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.getById(id);
      if (!user) {
        return new NotFoundException();
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @PermissionsData(`${PermissionResource.USER}-${PermissionAction.C}`)
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async create(@Body() body: CreateUserDto) {
    try {
      const user = await this.db.user.findUnique({
        where: { email: body.email },
      });
      if (user) {
        return new BadRequestException();
      }

      const newUser = await this.userService.create(body);
      return newUser;
    } catch (error: any) {
      return new InternalServerErrorException(error);
    }
  }

  @Patch(':id')
  @PermissionsData(`${PermissionResource.USER}-${PermissionAction.U}`)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(UpdateUserSchema)) body: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.userService.updateById(id, body);
      return updatedUser;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  @PermissionsData(`${PermissionResource.USER}-${PermissionAction.D}`)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleteItem = await this.userService.deleteById(id);
      return deleteItem;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
