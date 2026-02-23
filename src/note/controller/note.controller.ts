import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NoteService } from '../service/note.service';
import { NoteResponse } from '../response/note.response';
import { CurrentUser } from 'src/global/decorators/current-user.decorator';
import { Payload } from 'src/global/types';
import { NoteRequest } from '../request/note.request';

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

  @Post('create')
  async create(@CurrentUser() user: Payload, @Body() request: NoteRequest) {
    const response = await this.noteService.create(
      request,
      +request.bookId,
      user.id,
    );
    return response;
  }
}
