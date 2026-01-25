import { Image } from '@prisma/client';

export class ImageResponse {
  id: string;
  url: string;

  static fromModel(image: Image): ImageResponse {
    const { id, url } = image;
    return {
      id,
      url,
    } as ImageResponse;
  }
}
