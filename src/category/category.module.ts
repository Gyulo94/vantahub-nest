import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import { CategoryRepository } from './repository/category.repository';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
