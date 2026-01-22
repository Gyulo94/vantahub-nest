import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Role('ADMIN')
  @Get('all')
  async findAll(): Promise<AuthorResponse[]> {
    const response = await this.authorService.findAll();
    return response;
  }
}
