import { Injectable } from '@nestjs/common';
import { ReviewRepository } from '../repository/review.repository';
import { ReviewFilterRequest } from '../request/review-filter.request';
import { ReviewResponse } from '../response/review.response';
import { ReviewRequest } from '../request/review.request';
import { ApiException } from 'src/global/exception/api.exception';
import { ErrorCode } from 'src/global/enum/error-code.enum';
import { Transactional } from 'src/global/decorators/transactional.decorator';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async findReviewsAll(
    request: ReviewFilterRequest,
  ): Promise<ReviewResponse[]> {
    const filters = ReviewFilterRequest.toModel(request);
    const reviews = await this.reviewRepository.findAll(filters);
    const response = reviews.map((review) => ReviewResponse.fromModel(review));
    return response;
  }

  @Transactional()
  async createReview(
    request: ReviewRequest,
    userId: string,
  ): Promise<ReviewResponse> {
    const existingReview = await this.checkReviewExists(request.bookId, userId);

    if (existingReview) {
      throw new ApiException(ErrorCode.REVIEW_ALREADY_EXISTS);
    }

    const createdReview = await this.reviewRepository.create(
      ReviewRequest.toModel(request, userId),
    );

    await this.reviewRepository.updateAverageRating(request.bookId);

    const response = ReviewResponse.fromModel(createdReview);
    return response;
  }

  async checkReviewExists(bookId: number, userId: string) {
    const existingReview = await this.reviewRepository.findByBookIdAndUserId(
      bookId,
      userId,
    );
    return existingReview !== null;
  }
}
