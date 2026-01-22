import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from '../service/author.service';
import { AuthorRequest } from '../request/author.request';
import { Role } from 'src/global/decorators/role.decorator';
import { AuthorResponse } from '../response/author.response';
import { Message } from 'src/global/decorators/message.decorator';
import { ResponseMessage } from 'src/global/enum/response-message.enum';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Role('ADMIN')
  @Post('create')
  @Message(ResponseMessage.CREATE_AUTHOR_SUCCESS)
  async create(@Body() request: AuthorRequest): Promise<AuthorResponse> {
    const response = await this.authorService.createAuthor(request);
    return response;
  }

  @Get('all')
  async findAll(): Promise<AuthorResponse[]> {
    const response = await this.authorService.findAll();
    return response;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AuthorResponse> {
    const response = await this.authorService.findById(id);
    return response;
  }

  @Role('ADMIN')
  @Put('update/:id')
  @Message(ResponseMessage.UPDATE_AUTHOR_SUCCESS)
  async updateAuthor(
    @Param('id') id: string,
    @Body() request: AuthorRequest,
  ): Promise<AuthorResponse> {
    const response = await this.authorService.updateAuthor(id, request);
    return response;
  }
}
