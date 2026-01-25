import { Module } from '@nestjs/common';
import { PdfController } from './controller/pdf.controller';
import { PdfService } from './service/pdf.service';
import { PdfRepository } from './repository/pdf.repository';
@Module({
  controllers: [PdfController],
  providers: [PdfService, PdfRepository],
  exports: [PdfService, PdfRepository],
})
export class PdfModule {}
