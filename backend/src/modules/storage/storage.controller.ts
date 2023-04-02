import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { DatabaseService } from 'src/common/services/database.service';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller('storage')
@ApiTags('storage')
export class StorageController {
  constructor(private db: DatabaseService) {}

  @Get(':id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.db.file.findUnique({ where: { id } });
      if (!file) {
        return new NotFoundException();
      }
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.contentType(file.contenType);
      res.send(file.buffer);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (file) {
        const result = await this.db.file.create({
          data: {
            contenType: file.mimetype,
            buffer: file.buffer,
          },
        });
        return result;
      } else {
        return new InternalServerErrorException('Not found file');
      }
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException(error);
    }
  }
}
