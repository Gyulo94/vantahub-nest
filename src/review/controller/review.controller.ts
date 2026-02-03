import { Controller, Get, Query } from '@nestjs/common';
import { ReviewService } from '../service/review.service';
import { ReviewRequest } from '../request/review.request';
import { ReviewResponse } from '../response/review.response';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('all')
  async findReviewsAll(
    @Query() request: ReviewRequest,
  ): Promise<ReviewResponse[]> {
    const response = await this.reviewService.findReviewsAll(request);
    return response;
  }
}
