import { Book, Image, Author, Pdf } from '@prisma/client';
import { AuthorResponse } from 'src/author/response/author.response';
import { CategoryResponse } from 'src/category/response/category.response';
import { ImageResponse } from 'src/image/response/image.response';
import { PdfResponse } from 'src/pdf/response/pdf.response';

export class BookResponse {
  id: number;
  title: string;
  description?: string;
  slug: string;
  pdf: PdfResponse;
  publishedAt: Date;
  image: ImageResponse;
  category: CategoryResponse;
  author: AuthorResponse;
  rating: number;
  reviewCount: number;
  totalPages: number;
  createdAt: Date;
  updatedAt: Date;

  static fromModel(
    model: Book & {
      image?: Image;
      pdf?: Pdf;
      category?: CategoryResponse;
      author?: Author & { image?: Image };
    },
  ): BookResponse {
    const response = new BookResponse();
    response.id = model.id;
    response.title = model.title;
    response.description = model.description;
    response.slug = model.slug;
    response.pdf = model.pdf ? PdfResponse.fromModel(model.pdf) : null;
    response.publishedAt = model.publishedAt;
    response.image = model.image ? ImageResponse.fromModel(model.image) : null;
    response.category = model.category
      ? CategoryResponse.fromModel(model.category)
      : null;
    response.author = model.author
      ? AuthorResponse.fromModel(model.author)
      : null;
    response.rating = model.rating;
    response.reviewCount = model.reviewCount;
    response.totalPages = model.totalPages;
    response.createdAt = model.createdAt;
    response.updatedAt = model.updatedAt;
    return response;
  }
}
