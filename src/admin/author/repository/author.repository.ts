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

  async findAll(): Promise<Author[]> {
    const result = await this.prisma.author.findMany({
      include: {
        image: true,
      },
    });
    return result;
  }
}
