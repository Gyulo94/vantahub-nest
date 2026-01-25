import { Author, Image } from '@prisma/client';
import { ImageResponse } from 'src/image/response/image.response';

export class AuthorResponse {
  id: string;
  name: string;
  bio?: string;
  image: ImageResponse;
  createdAt: Date;
  updatedAt: Date;

  static fromModel(model: Author & { image?: Image }): AuthorResponse {
    const response = new AuthorResponse();
    response.id = model.id;
    response.name = model.name;
    response.bio = model.bio;
    response.image = model.image ? ImageResponse.fromModel(model.image) : null;
    response.createdAt = model.createdAt;
    response.updatedAt = model.updatedAt;
    return response;
  }
}
