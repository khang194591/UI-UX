import { Module } from '@nestjs/common';
import { DatabaseService } from '../../common/services/database.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService],
})
export class UserModule {}
