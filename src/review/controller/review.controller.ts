import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReviewService } from '../service/review.service';
import { ReviewFilterRequest } from '../request/review-filter.request';
import { ReviewResponse } from '../response/review.response';
import { CurrentUser } from 'src/global/decorators/current-user.decorator';
import { Payload } from 'src/global/types';
import { ReviewRequest } from '../request/review.request';
import { Message } from 'src/global/decorators/message.decorator';
import { ResponseMessage } from 'src/global/enum/response-message.enum';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('all')
  async findReviewsAll(
    @Query() request: ReviewFilterRequest,
  ): Promise<ReviewResponse[]> {
    const response = await this.reviewService.findReviewsAll(request);
    return response;
  }

  @Message(ResponseMessage.CREATE_REVIEW_SUCCESS)
  @Post('create')
  async createReview(
    @Body() request: ReviewRequest,
    @CurrentUser() user: Payload,
  ): Promise<ReviewResponse> {
    const response = await this.reviewService.createReview(request, user.id);
    return response;
  }

  @Get('exists')
  async checkReviewExists(
    @Query('bookId') bookId: number,
    @CurrentUser() user: Payload,
  ): Promise<Boolean> {
    const response = await this.reviewService.checkReviewExists(
      bookId,
      user.id,
    );
    return response;
  }
}
