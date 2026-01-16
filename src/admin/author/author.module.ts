import { Module } from '@nestjs/common';
import { AuthorService } from './service/author.service';
import { AuthorController } from './controller/author.controller';
import { AuthorRepository } from './repository/author.repository';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorService],
})
export class AuthorModule {}
