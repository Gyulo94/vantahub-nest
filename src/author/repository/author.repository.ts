import { Injectable } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class AuthorRepository {
  constructor(private readonly prisma: PrismaService) {}
  save(data: Prisma.AuthorCreateInput) {
    return this.prisma.author.create({
      data,
    });
  }

  updateAuthorImage(id: string, imageId: string) {
    return this.prisma.author.update({
      where: { id },
      data: { imageId },
    });
  }

  findById(authorId: string) {
    return this.prisma.author.findUnique({
      where: { id: authorId },
      include: {
        image: true,
      },
    });
  }

  async findAll(ids?: string[]): Promise<Author[]> {
    const where: Prisma.AuthorWhereInput | undefined = {
      id: ids ? { in: ids } : undefined,
    };

    const result = await this.prisma.author.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        image: true,
      },
    });
    return result;
  }

  async update(id: string, data: Prisma.AuthorCreateInput): Promise<Author> {
    const result = await this.prisma.author.update({
      where: { id },
      data,
    });
    return result;
  }

  async deleteMany(ids: string[]) {
    await this.prisma.author.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
