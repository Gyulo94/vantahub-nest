import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from '../service/book.service';
import { BookRequest } from '../request/book.request';
import { Role } from 'src/global/decorators/role.decorator';
import { BookResponse } from '../response/book.response';
import { Message } from 'src/global/decorators/message.decorator';
import { ResponseMessage } from 'src/global/enum/response-message.enum';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Role('ADMIN')
  @Post('create')
  @Message(ResponseMessage.CREATE_BOOK_SUCCESS)
  async create(@Body() request: BookRequest): Promise<BookResponse> {
    const response = await this.bookService.create(request);
    return response;
  }

  @Get('all')
  async findAll(): Promise<BookResponse[]> {
    const response = await this.bookService.findAll();
    return response;
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<BookResponse> {
    const response = await this.bookService.findById(+id);
    return response;
  }

  @Role('ADMIN')
  @Put('update/:id')
  @Message(ResponseMessage.UPDATE_BOOK_SUCCESS)
  async updateBook(
    @Param('id') id: number,
    @Body() request: BookRequest,
  ): Promise<BookResponse> {
    const response = await this.bookService.update(+id, request);
    return response;
  }

  @Role('ADMIN')
  @Delete('delete')
  @Message(ResponseMessage.DELETE_BOOK_SUCCESS)
  async deleteManyBooks(@Body('ids') ids: number[]): Promise<void> {
    await this.bookService.deleteMany(ids.map((id) => +id));
  }
}
