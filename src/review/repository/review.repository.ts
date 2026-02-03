import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { Book, Prisma, Review, User } from '@prisma/client';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    data: Prisma.ReviewWhereInput,
  ): Promise<(Review & { user: User; book: Book })[]> {
    const where: Prisma.ReviewWhereInput = { ...data };
    const reviews = await this.prisma.review.findMany({
      where,
      include: { user: true, book: true },
    });
    return reviews;
  }
}
