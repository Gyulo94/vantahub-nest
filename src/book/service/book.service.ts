import { Injectable } from '@nestjs/common';
import { BookRequest } from '../request/book.request';
import { BookRepository } from '../repository/book.repository';
import { ImageService } from 'src/image/service/image.service';
import { Transactional } from 'src/global/decorators/transactional.decorator';
import { ImageResponse } from 'src/image/response/image.response';
import { BookResponse } from '../response/book.response';
import { ApiException } from 'src/global/exception/api.exception';
import { ErrorCode } from 'src/global/enum/error-code.enum';
import { PdfService } from 'src/pdf/service/pdf.service';
import { PdfResponse } from 'src/pdf/response/pdf.response';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly imageService: ImageService,
    private readonly pdfService: PdfService,
  ) {}

  @Transactional()
  async create(request: BookRequest): Promise<BookResponse> {
    const newBookEntity = await this.bookRepository.save(
      BookRequest.toModel(request),
    );
    const bookId = newBookEntity.id;
    if (request.image) {
      const savedImages: ImageResponse[] = await this.imageService.createImages(
        {
          id: String(bookId),
          images: [request.image],
          existingImages: [],
          entity: 'book',
        },
      );
      const image = savedImages[0];
      await this.bookRepository.updateBookImage(bookId, image.id);
    }

    if (request.pdf) {
      const savedPdfs: PdfResponse[] = await this.pdfService.createPdfs({
        id: String(bookId),
        pdfs: [request.pdf],
        existingPdfs: [],
        entity: 'book',
      });
      const pdf = savedPdfs[0];
      await this.bookRepository.updateBookPdf(bookId, pdf);
    }

    const newBook = await this.bookRepository.findById(bookId);
    const response = BookResponse.fromModel(newBook);
    return response;
  }

  async findAll(): Promise<BookResponse[]> {
    const books = await this.bookRepository.findAll();
    const response = books.map((book) => BookResponse.fromModel(book));
    return response;
  }

  async findById(id: number): Promise<BookResponse> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new ApiException(ErrorCode.BOOK_NOT_FOUND);
    }
    const response = BookResponse.fromModel(book);
    return response;
  }

  async update(id: number, request: BookRequest) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new ApiException(ErrorCode.BOOK_NOT_FOUND);
    }

    const updateBookEntity = await this.bookRepository.update(
      id,
      BookRequest.toModel(request),
    );
    const bookId = updateBookEntity.id;
    if (request.image) {
      const savedImages: ImageResponse[] = await this.imageService.updateImages(
        book.imageId,
        {
          id: String(bookId),
          images: [request.image],
          existingImages: [book.image.url],
          entity: 'book',
        },
      );
      const image = savedImages[0];
      await this.bookRepository.updateBookImage(bookId, image.id);
    }

    if (request.pdf) {
      const savedPdfs: PdfResponse[] = await this.pdfService.updatePdfs(
        book.pdfId,
        {
          id: String(bookId),
          pdfs: [request.pdf],
          existingPdfs: [book.pdf.url],
          entity: 'book',
        },
      );
      const pdf = savedPdfs[0];
      await this.bookRepository.updateBookPdf(bookId, pdf);
    }

    const newBook = await this.bookRepository.findById(bookId);
    const response = BookResponse.fromModel(newBook);
    return response;
  }

  @Transactional()
  async deleteMany(ids: number[]): Promise<void> {
    const books = await this.bookRepository.findAll(ids);
    if (books.length !== ids.length) {
      throw new ApiException(ErrorCode.BOOK_NOT_FOUND);
    }

    const imageIds = books.map((book) => book.imageId);

    const request = {
      ids: imageIds.map((id) => String(id)),
      serviceName: 'vantahub',
      entity: 'book',
      images: [],
    };

    await this.imageService.deleteImages(imageIds, request);
    await this.bookRepository.deleteMany(ids);
  }
}
