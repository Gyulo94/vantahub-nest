import { Controller, Post } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { ImageRequest } from '../request/image.request';
import { Public } from 'src/global/decorators/public.decorator';
import { ImageResponse } from '../response/image.response';

@Public()
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('image/create')
  async createImages(request: ImageRequest): Promise<ImageResponse[]> {
    const response: ImageResponse[] =
      await this.imageService.createImages(request);
    return response;
  }
}
