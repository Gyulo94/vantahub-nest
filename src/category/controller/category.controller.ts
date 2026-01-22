import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CategoryRequest } from '../request/category.request';
import { Role } from 'src/global/decorators/role.decorator';
import { CategoryResponse } from '../response/category.response';
import { Message } from 'src/global/decorators/message.decorator';
import { ResponseMessage } from 'src/global/enum/response-message.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Role('ADMIN')
  @Post('create')
  @Message(ResponseMessage.CREATE_CATEGORY_SUCCESS)
  async create(@Body() request: CategoryRequest): Promise<CategoryResponse> {
    const response = await this.categoryService.createCategory(request);
    return response;
  }

  @Get('all')
  async findAll(): Promise<CategoryResponse[]> {
    const response = await this.categoryService.findAll();
    return response;
  }
}
