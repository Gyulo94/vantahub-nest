import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class AuthorRequest {
  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bio: string;

  public static toModel(request: AuthorRequest): Prisma.AuthorCreateInput {
    const { name, bio } = request;
    const author: Prisma.AuthorCreateInput = {
      name,
      bio,
    };
    return author;
  }
}
