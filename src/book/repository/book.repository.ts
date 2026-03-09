import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { PdfResponse } from 'src/pdf/response/pdf.response';
import { BookFilter } from '../request/book.filter';
import { formatCategoryName } from 'src/global/utils';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}
  save(data: Prisma.BookCreateInput) {
    return this.prisma.book.create({
      data,
    });
  }

  updateBookImage(id: number, imageId: string) {
    return this.prisma.book.update({
      where: { id },
      data: { imageId },
    });
  }

  updateBookPdf(id: number, pdf: PdfResponse) {
    return this.prisma.book.update({
      where: { id },
      data: { pdfId: pdf.id, totalPages: pdf.totalPages },
    });
  }

  findById(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        image: true,
        pdf: true,
        category: true,
        author: { include: { image: true } },
      },
    });
  }

  async findAll(filter?: BookFilter): Promise<{
    books: Book[];
    page: number;
    limit: number;
    totalCount: number;
  }> {
    const { categoryName, page = 1, take = 8 } = filter || {};
    const where: Prisma.BookWhereInput = {
      category: categoryName
        ? { name: formatCategoryName(categoryName) }
        : undefined,
    };

    const limit = take || 8;
    const skip = page && take ? (page - 1) * take : 0;

    const books = await this.prisma.book.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip,
      include: {
        image: true,
        author: true,
        category: true,
        pdf: true,
      },
    });

    const totalCount = await this.prisma.book.count({
      where,
    });
    return { page, limit, totalCount, books };
  }

  async update(id: number, data: Prisma.BookCreateInput): Promise<Book> {
    const result = await this.prisma.book.update({
      where: { id },
      data,
    });
    return result;
  }

  async deleteMany(ids: number[]) {
    await this.prisma.book.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findByIds(ids: number[]): Promise<Book[]> {
    const result = await this.prisma.book.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        image: true,
      },
    });
    return result;
  }
}
