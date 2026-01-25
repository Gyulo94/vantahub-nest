import { Prisma } from '@prisma/client';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class BookRequest {
  @IsString()
  authorId: string;

  @IsString()
  categoryId: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  pdf: string;

  @IsDate()
  publishedAt: Date;

  @IsString()
  slug: string;

  @IsString()
  title: string;

  public static toModel(request: BookRequest): Prisma.BookCreateInput {
    const { authorId, categoryId, description, publishedAt, slug, title } =
      request;
    const book: Prisma.BookCreateInput = {
      author: { connect: { id: authorId } },
      category: { connect: { id: categoryId } },
      description,
      publishedAt,
      slug,
      title,
    };
    return book;
  }
}
