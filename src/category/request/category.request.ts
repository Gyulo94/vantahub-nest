import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CategoryRequest {
  @IsString()
  name: string;

  public static toModel(request: CategoryRequest): Prisma.CategoryCreateInput {
    const { name } = request;
    const category: Prisma.CategoryCreateInput = {
      name,
    };
    return category;
  }
}
