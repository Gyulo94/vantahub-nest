import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [AuthorModule],
  exports: [AuthorModule],
})
export class AdminModule {}
