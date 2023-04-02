import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/services/database.service';

@Injectable()
export class StorageService {
  constructor(private db: DatabaseService) {}
}
