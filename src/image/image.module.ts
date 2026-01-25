import { Module } from '@nestjs/common';
import { ImageService } from './service/image.service';
import { ImageRepository } from './repository/image.repository';
import { ImageController } from './controller/image.controller';

@Module({
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
  exports: [ImageService, ImageRepository],
})
export class ImageModule {}
