import { Module } from '@nestjs/common';
import { ImageService } from './service/image.service';
import { ImageRepository } from './repository/image.repository';
import { FileController } from './controller/file.controller';

@Module({
  controllers: [FileController],
  providers: [ImageService, ImageRepository],
  exports: [ImageService, ImageRepository],
})
export class FileModule {}
