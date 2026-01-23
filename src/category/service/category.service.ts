import { Injectable } from '@nestjs/common';
import { CategoryRequest } from '../request/category.request';
import { CategoryRepository } from '../repository/category.repository';
import { ImageService } from 'src/file/service/image.service';
import { Transactional } from 'src/global/decorators/transactional.decorator';
import { CategoryResponse } from '../response/category.response';
import { ErrorCode } from 'src/global/enum/error-code.enum';
import { ApiException } from 'src/global/exception/api.exception';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly imageService: ImageService,
  ) {}

  @Transactional()
  async create(request: CategoryRequest): Promise<CategoryResponse> {
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

  async findById(id: string): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new ApiException(ErrorCode.CATEGORY_NOT_FOUND);
    }
    const response = CategoryResponse.fromModel(category);
    return response;
  }

  async update(id: string, request: CategoryRequest) {
    const category = await this.findById(id);
    if (!category) {
      throw new ApiException(ErrorCode.CATEGORY_NOT_FOUND);
    }

    const updateCategoryEntity = await this.categoryRepository.update(
      id,
      CategoryRequest.toModel(request),
    );
    const response = CategoryResponse.fromModel(updateCategoryEntity);
    return response;
  }

  async deleteMany(ids: string[]) {
    const categories = await this.categoryRepository.findAll(ids);
    if (categories.length !== ids.length) {
      throw new ApiException(ErrorCode.CATEGORY_NOT_FOUND);
    }
    await this.categoryRepository.deleteMany(ids);
  }
}
