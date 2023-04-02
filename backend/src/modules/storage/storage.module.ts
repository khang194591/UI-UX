import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { DatabaseService } from 'src/common/services/database.service';

@Module({
  controllers: [StorageController],
  providers: [DatabaseService],
})
export class StorageModule {}
