import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NoteService } from '../service/note.service';
import { NoteResponse } from '../response/note.response';
import { CurrentUser } from 'src/global/decorators/current-user.decorator';
import { Payload } from 'src/global/types';
import { NoteRequest } from '../request/note.request';
import { Message } from 'src/global/decorators/message.decorator';
import { ResponseMessage } from 'src/global/enum/response-message.enum';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':bookId/all')
  async findAll(
    @Param('bookId') bookId: number,
    @CurrentUser() user: Payload,
  ): Promise<NoteResponse[]> {
    const response = await this.noteService.findAll(+bookId, user.id);
    return response;
  }

  @Message(ResponseMessage.CREATE_NOTE_SUCCESS)
  @Post('create')
  async create(@CurrentUser() user: Payload, @Body() request: NoteRequest) {
    const response = await this.noteService.create(
      request,
      +request.bookId,
      user.id,
    );
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: Payload) {
    const response = await this.noteService.findById(id, user.id);
    return response;
  }

  @Message(ResponseMessage.UPDATE_NOTE_SUCCESS)
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: Payload,
    @Body() request: NoteRequest,
  ) {
    const response = await this.noteService.update(request, id, user.id);
    return response;
  }

  @Message(ResponseMessage.DELETE_NOTE_SUCCESS)
  @Delete('delete/:id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: Payload,
  ): Promise<number> {
    const response = await this.noteService.delete(id, user.id);
    return response;
  }
}
