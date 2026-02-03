import { Injectable } from '@nestjs/common';
import { ReviewRepository } from '../repository/review.repository';
import { ReviewRequest } from '../request/review.request';
import { ReviewResponse } from '../response/review.response';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async findReviewsAll(request: ReviewRequest): Promise<ReviewResponse[]> {
    const filters = ReviewRequest.toModel(request);
    const reviews = await this.reviewRepository.findAll(filters);
    const response = reviews.map((review) => ReviewResponse.fromModel(review));
    return response;
  }
}
