import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class NoteRequest {
  @IsNumber()
  bookId: number;

  @IsString()
  content: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HighlightArea)
  highlightAreas: HighlightArea[];

  @IsString()
  quote: string;

  @IsNumber()
  pageIndex: number;

  static toModel(
    request: NoteRequest,
    userId: string,
    bookId: number,
  ): Prisma.NoteCreateInput {
    const model: Prisma.NoteCreateInput = {
      content: request.content,
      highlightAreas: JSON.stringify(request.highlightAreas),
      quote: request.quote,
      pageIndex: request.pageIndex,
      book: {
        connect: {
          id: bookId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    };
    return model;
  }
}

export class HighlightArea {
  @IsNumber()
  height: number;

  @IsNumber()
  left: number;

  @IsNumber()
  pageIndex: number;

  @IsNumber()
  top: number;

  @IsNumber()
  width: number;
}
