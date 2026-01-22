import { Injectable } from '@nestjs/common';
import { CategoryRequest } from '../request/category.request';
import { CategoryRepository } from '../repository/category.repository';
import { ImageService } from 'src/file/service/image.service';
import { Transactional } from 'src/global/decorators/transactional.decorator';
import { CategoryResponse } from '../response/category.response';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly imageService: ImageService,
  ) {}

  @Transactional()
  async createCategory(request: CategoryRequest): Promise<CategoryResponse> {
    const newCategory = await this.categoryRepository.save(
      CategoryRequest.toModel(request),
    );
    const response = CategoryResponse.fromModel(newCategory);
    return response;
  }

  async findAll(): Promise<CategoryResponse[]> {
    const categories = await this.categoryRepository.findAll();
    const response = categories.map((category) =>
      CategoryResponse.fromModel(category),
    );
    return response;
  }
}
