import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseQueryString } from 'src/common/interfaces';
import { DatabaseService } from 'src/common/services/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async getAll(query: BaseQueryString): Promise<User[]> {
    try {
      const { take = 5, skip = 0 } = query;
      const results = await this.db.user.findMany({
        take,
        skip,
        include: {
          role: true,
        },
      });
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
        include: { role: true },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(data: CreateUserDto): Promise<User> {
    try {
      const newItem = await this.db.user.create({
        data,
        include: {
          role: true,
        },
      });
      const newItemId = newItem.id;
      if (newItemId) {
        return newItem;
      }
      throw new InternalServerErrorException();
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, data: UpdateUserDto) {
    try {
      const updateItem = await this.db.user.update({
        where: { id },
        data,
        include: {
          role: true,
        },
      });
      return updateItem;
    } catch (error) {}
  }

  async deleteById(id: number) {
    try {
      const deleteItem = await this.db.user.delete({ where: { id } });
      return deleteItem;
    } catch (error) {
      throw error;
    }
  }
}
