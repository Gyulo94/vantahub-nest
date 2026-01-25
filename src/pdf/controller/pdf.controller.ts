import { Controller, Post } from '@nestjs/common';
import { Public } from 'src/global/decorators/public.decorator';
import { PdfRequest } from '../request/pdf.request';
import { PdfService } from '../service/pdf.service';
import { PdfResponse } from '../response/pdf.response';

@Public()
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('pdf/create')
  async createPdfs(request: PdfRequest): Promise<PdfResponse[]> {
    const response: PdfResponse[] = await this.pdfService.createPdfs(request);
    return response;
  }
}
