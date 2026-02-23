import { Note } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class NoteResponse {
  id: string;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
  pageIndex: number;
  userId: string;
  bookId: number;

  static fromModel(model: Note): NoteResponse {
    const response = new NoteResponse();
    response.id = model.id;
    response.content = model.content;
    response.highlightAreas =
      typeof model.highlightAreas === 'string'
        ? JSON.parse(model.highlightAreas)
        : model.highlightAreas;
    response.quote = model.quote;
    response.pageIndex = model.pageIndex;
    response.userId = model.userId;
    response.bookId = model.bookId;
    return response;
  }
}

export class HighlightArea {
  @IsNumber()
  height: number;
  left: number;
  pageIndex: number;
  top: number;
  width: number;
}
