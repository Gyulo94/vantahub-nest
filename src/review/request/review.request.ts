import { Prisma } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class ReviewRequest {
  @IsNumber()
  bookId: number;

  @IsNumber()
  rating: number;

  @IsString()
  comment: string;

  static toModel(
    request: ReviewRequest,
    userId: string,
  ): Prisma.ReviewCreateInput {
    const model: Prisma.ReviewCreateInput = {
      book: {
        connect: { id: request.bookId },
      },
      user: {
        connect: { id: userId },
      },
      rating: request.rating,
      comment: request.comment,
    };
    return model;
  }
}
