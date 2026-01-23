import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
    const response = await this.categoryService.create(request);
    return response;
  }

  @Get('all')
  async findAll(): Promise<CategoryResponse[]> {
    const response = await this.categoryService.findAll();
    return response;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CategoryResponse> {
    const response = await this.categoryService.findById(id);
    return response;
  }

  @Role('ADMIN')
  @Put('update/:id')
  @Message(ResponseMessage.UPDATE_CATEGORY_SUCCESS)
  async updateCategory(
    @Param('id') id: string,
    @Body() request: CategoryRequest,
  ): Promise<CategoryResponse> {
    const response = await this.categoryService.update(id, request);
    return response;
  }

  @Role('ADMIN')
  @Delete('delete')
  @Message(ResponseMessage.DELETE_CATEGORY_SUCCESS)
  async deleteManyCategories(@Body('ids') ids: string[]): Promise<void> {
    await this.categoryService.deleteMany(ids);
  }
}
