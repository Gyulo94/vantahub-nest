import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';

export class ReviewRequest {
  @IsNumber()
  @IsOptional()
  bookId: number;

  static toModel(request: ReviewRequest): Prisma.ReviewWhereInput {
    const model = new ReviewRequest();
    model.bookId = request.bookId;
    return model;
  }
}
