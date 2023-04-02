import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { DatabaseService } from 'src/common/services/database.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly db: DatabaseService) {}

  async getAll(): Promise<Role[]> {
    try {
      const results = await this.db.role.findMany({
        include: {
          permissions: true,
        },
      });
      return results;
    } catch (error) {
      throw error;
    }
  }

  async create(data: CreateRoleDto): Promise<Role> {
    try {
      const { permissions, ...roleData } = data;
      const permissionIds = permissions.map((item) => ({
        id: item,
      }));
      const newItem = await this.db.role.create({
        data: {
          ...roleData,
          permissions: {
            connect: [...permissionIds],
          },
        },
        include: {
          permissions: true,
        },
      });
      const itemId = newItem.id;
      if (itemId) {
        return newItem;
      }
      throw new InternalServerErrorException();
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, data: UpdateRoleDto): Promise<Role> {
    try {
      const { permissions, ...roleData } = data;

      const permissionIds = permissions.map((item) => ({
        id: item,
      }));

      const updateItem = await this.db.role.update({
        where: { id },
        data: {
          ...roleData,
          permissions: {
            set: permissionIds,
          },
        },
        include: {
          permissions: true,
        },
      });
      return updateItem;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<Role> {
    try {
      const deleteItem = await this.db.role.delete({ where: { id } });
      return deleteItem;
    } catch (error) {
      throw error;
    }
  }

  async getPermissions() {
    try {
      const results = await this.db.permission.findMany();
      return results;
    } catch (error) {
      throw error;
    }
  }
}
