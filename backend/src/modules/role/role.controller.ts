import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionAction, PermissionResource } from '@prisma/client';
import { BEARER } from 'src/common/constants';
import {
  AuthorizationGuard,
  PermissionsData,
} from 'src/common/guards/authorization.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { JoiValidationPipe } from 'src/common/pipes/joi.validation.pipe';
import { DatabaseService } from 'src/common/services/database.service';
import { CreateRoleDto, CreateRoleSchema } from './dto/create-role.dto';
import { UpdateRoleDto, UpdateRoleSchema } from './dto/update-role.dto';
import { RoleService } from './role.service';

@Controller('roles')
// @UseGuards(JwtGuard, AuthorizationGuard)
@ApiTags('roles')
@ApiBearerAuth(BEARER)
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly db: DatabaseService,
  ) {}

  @Get()
  @PermissionsData(`${PermissionResource.ROLE}-${PermissionAction.R}`)
  async getAll() {
    try {
      const items = await this.roleService.getAll();
      return {
        items: items,
        totalItems: items.length,
      };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Post()
  @PermissionsData(`${PermissionResource.ROLE}-${PermissionAction.C}`)
  @UsePipes(new JoiValidationPipe(CreateRoleSchema))
  async create(@Req() req: Request, @Body() body: CreateRoleDto) {
    try {
      const item = await this.db.role.findUnique({
        where: { name: body.name },
      });
      if (item) {
        return new BadRequestException();
      }

      const newItem = await this.roleService.create(body);
      return newItem;
    } catch (error: any) {
      return new InternalServerErrorException();
    }
  }

  @Patch(':id')
  @PermissionsData(`${PermissionResource.ROLE}-${PermissionAction.U}`)
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(UpdateRoleSchema)) body: UpdateRoleDto,
  ) {
    try {
      const updateItem = await this.roleService.updateById(id, body);
      return updateItem;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Delete(':id')
  @PermissionsData(`${PermissionResource.ROLE}-${PermissionAction.D}`)
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleteItem = await this.roleService.deleteById(id);
      return deleteItem;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get('permissions')
  async getPermission() {
    try {
      const items = await this.roleService.getPermissions();
      return {
        items,
        totalItems: items.length,
      };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
