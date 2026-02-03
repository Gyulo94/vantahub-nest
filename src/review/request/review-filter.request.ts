import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';

export class ReviewFilterRequest {
  @IsNumber()
  @IsOptional()
  bookId: number;

  static toModel(request: ReviewFilterRequest): Prisma.ReviewWhereInput {
    const model = new ReviewFilterRequest();
    model.bookId = request.bookId;
    return model;
  }
}
