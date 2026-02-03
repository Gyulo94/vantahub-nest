import { Module } from '@nestjs/common';
import { ReviewService } from './service/review.service';
import { ReviewController } from './controller/review.controller';
import { ReviewRepository } from './repository/review.repository';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewService],
})
export class ReviewModule {}
