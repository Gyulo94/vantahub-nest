import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { PdfResponse } from 'src/pdf/response/pdf.response';

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

  async findAll(ids?: number[]): Promise<Book[]> {
    const where: Prisma.BookWhereInput | undefined = {
      id: ids ? { in: ids } : undefined,
    };

    const result = await this.prisma.book.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        image: true,
        author: true,
        category: true,
        pdf: true,
      },
    });
    return result;
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
}
