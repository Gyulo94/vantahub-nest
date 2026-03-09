import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../repository/note.repository';
import { NoteResponse } from '../response/note.response';
import { NoteRequest } from '../request/note.request';
import { ApiException } from 'src/global/exception/api.exception';
import { ErrorCode } from 'src/global/enum/error-code.enum';

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

  async findById(id: string, userId: string): Promise<NoteResponse> {
    const note = await this.noteRepository.findById(id, userId);
    if (!note) {
      throw new ApiException(ErrorCode.NOTE_NOT_FOUND);
    }
    const response = NoteResponse.fromModel(note);
    return response;
  }

  async update(
    request: NoteRequest,
    id: string,
    userId: string,
  ): Promise<NoteResponse> {
    const note = await this.noteRepository.findById(id, userId);
    if (!note) {
      throw new ApiException(ErrorCode.NOTE_NOT_FOUND);
    }
    const updatedNote = await this.noteRepository.update(
      NoteRequest.toModel(request, userId, +request.bookId),
      id,
    );
    const response = NoteResponse.fromModel(updatedNote);
    return response;
  }

  async delete(id: string, userId: string): Promise<number> {
    const note = await this.noteRepository.findById(id, userId);
    if (!note) {
      throw new ApiException(ErrorCode.NOTE_NOT_FOUND);
    }
    await this.noteRepository.delete(id, userId);
    return note.bookId;
  }
}
