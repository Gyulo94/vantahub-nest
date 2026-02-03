import { Book, Review, User } from '@prisma/client';
import { BookResponse } from 'src/book/response/book.response';
import { UserResponse } from 'src/user/reponse/user.response';

export class ReviewResponse {
  id: string;
  user: UserResponse;
  book: BookResponse;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;

  static fromModel(
    review: Review & { user: User; book: Book },
  ): ReviewResponse {
    const response = new ReviewResponse();
    response.id = review.id;
    response.user = UserResponse.fromModel(review.user);
    response.book = BookResponse.fromModel(review.book);
    response.rating = review.rating;
    response.comment = review.comment;
    response.createdAt = review.createdAt;
    response.updatedAt = review.updatedAt;
    return response;
  }
}
