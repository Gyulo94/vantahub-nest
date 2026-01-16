import { Controller, Post } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { ImageRequest } from '../request/image.request';
import { Public } from 'src/global/decorators/public.decorator';
import { ImageResponse } from '../response/image.response';

@Public()
@Controller('file')
export class FileController {
  constructor(private readonly imageService: ImageService) {}

  @Post('image/upload')
  async uploadImage(request: ImageRequest): Promise<string[]> {
    const response: string[] = await this.imageService.uploadImage(request);
    return response;
  }

  @Post('image/create')
  async createImages(request: ImageRequest): Promise<ImageResponse[]> {
    const response: ImageResponse[] =
      await this.imageService.createImages(request);
    return response;
  }
}
