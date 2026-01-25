import { Module } from '@nestjs/common';
import { AuthorService } from './service/author.service';
import { AuthorController } from './controller/author.controller';
import { AuthorRepository } from './repository/author.repository';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorService],
})
export class AuthorModule {}
