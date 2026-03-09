import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class NoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(bookId: number, userId: string) {
    const result = await this.prisma.note.findMany({
      where: {
        bookId,
        userId,
      },
      orderBy: {
        pageIndex: 'asc',
      },
    });
    return result;
  }

  async save(data: Prisma.NoteCreateInput) {
    const result = await this.prisma.note.create({
      data,
    });
    return result;
  }

  async findById(id: string, userId: string) {
    const result = await this.prisma.note.findUnique({
      where: {
        id,
        userId,
      },
    });
    return result;
  }

  async update(data: Prisma.NoteUpdateInput, id: string) {
    const result = await this.prisma.note.update({
      where: {
        id,
      },
      data,
    });
    return result;
  }

  async delete(id: string, userId: string) {
    await this.prisma.note.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
