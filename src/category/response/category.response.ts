import { Category } from '@prisma/client';

export class CategoryResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  static fromModel(model: Category): CategoryResponse {
    const response = new CategoryResponse();
    response.id = model.id;
    response.name = model.name;
    response.createdAt = model.createdAt;
    response.updatedAt = model.updatedAt;
    return response;
  }
}
