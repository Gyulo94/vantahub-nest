import { Module } from '@nestjs/common';
import { NoteService } from './service/note.service';
import { NoteController } from './controller/note.controller';
import { NoteRepository } from './repository/note.repository';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
  exports: [NoteService, NoteRepository],
})
export class NoteModule {}
