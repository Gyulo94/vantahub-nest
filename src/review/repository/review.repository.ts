import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(data: Prisma.ReviewWhereInput) {
    const where: Prisma.ReviewWhereInput = { ...data };
    const result = await this.prisma.review.findMany({
      where,
      include: { user: { include: { image: true } }, book: true },
    });
    return result;
  }

  async create(data: Prisma.ReviewCreateInput) {
    const result = await this.prisma.review.create({
      data,
      include: { user: { include: { image: true } }, book: true },
    });
    return result;
  }

  async findByBookIdAndUserId(bookId: number, userId: string) {
    const result = await this.prisma.review.findFirst({
      where: {
        bookId,
        userId,
      },
      include: { user: { include: { image: true } }, book: true },
    });
    return result;
  }

async updateAverageRating(bookId: number) {
  const result = await this.prisma.review.aggregate({
    where: { bookId },
    _avg: { rating: true },
    _count: { rating: true }, 
  });
  const avgRating = result._avg.rating ?? 0;
  const reviewCount = result._count.rating;

  await this.prisma.book.update({
    where: { id: bookId },
    data: {
      rating: avgRating,
      reviewCount,
    },
  });
}
}
