import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { BookController } from './controller/book.controller';
import { ImageModule } from 'src/image/image.module';
import { BookRepository } from './repository/book.repository';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  imports: [ImageModule, PdfModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService],
})
export class BookModule {}
