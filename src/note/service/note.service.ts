import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../repository/note.repository';
import { NoteResponse } from '../response/note.response';
import { NoteRequest } from '../request/note.request';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async findAll(bookId: number, userId: string): Promise<NoteResponse[]> {
    const notes = await this.noteRepository.findAll(bookId, userId);
    const response = notes.map((note) => NoteResponse.fromModel(note));
    return response;
  }

  async create(
    request: NoteRequest,
    bookId: number,
    userId: string,
  ): Promise<NoteResponse> {
    const newNote = await this.noteRepository.save(
      NoteRequest.toModel(request, userId, bookId),
    );
    const response = NoteResponse.fromModel(newNote);
    return response;
  }
}
