import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { PdfRepository } from '../repository/pdf.repository';
import { catchError, firstValueFrom } from 'rxjs';
import { Transactional } from 'src/global/decorators/transactional.decorator';
import { ApiException } from 'src/global/exception/api.exception';
import { ErrorCode } from 'src/global/enum/error-code.enum';
import { PdfRequest } from '../request/pdf.request';
import { PdfResponse } from '../response/pdf.response';

@Injectable()
export class PdfService {
  private readonly LOGGER = new Logger(PdfService.name);
  constructor(
    private readonly pdfRepository: PdfRepository,
    private readonly httpSerivce: HttpService,
  ) {}

  private FILE_URL = process.env.FILE_URL;

  @Transactional()
  async createPdfs(request: PdfRequest): Promise<PdfResponse[]> {
    const { data: pdfs } = await firstValueFrom(
      this.httpSerivce
        .post<
          { url: string; totalPages: number }[]
        >(`${this.FILE_URL}/vantahub/pdf/create`, request)
        .pipe(
          catchError((error) => {
            this.LOGGER.error('Error uploading PDF', error);
            throw error;
          }),
        ),
    );
    const savedPdfs = await this.pdfRepository.saveAll(
      pdfs.map((pdf) => pdf.url),
    );
    const response: PdfResponse[] = savedPdfs.map((pdf, index) =>
      PdfResponse.fromModel({ ...pdf, totalPages: pdfs[index].totalPages }),
    );
    return response;
  }

  @Transactional()
  async updatePdfs(id: string, request: PdfRequest): Promise<PdfResponse[]> {
    const { data: pdfs } = await firstValueFrom(
      this.httpSerivce
        .put<
          { url: string; totalPages: number }[]
        >(`${this.FILE_URL}/vantahub/pdf/update`, request)
        .pipe(
          catchError((error) => {
            this.LOGGER.error('Error uploading image', error);
            throw error;
          }),
        ),
    );
    const updatePdfs = await this.pdfRepository.update(
      id,
      pdfs.map((pdf) => pdf.url),
    );
    const response: PdfResponse[] = updatePdfs.map((pdf, index) =>
      PdfResponse.fromModel({ ...pdf, totalPages: pdfs[index].totalPages }),
    );
    return response;
  }

  @Transactional()
  async deleteImages(ids: string[], request: PdfRequest): Promise<void> {
    const existingImages = await this.pdfRepository.findAll(ids);
    if (existingImages.length !== ids.length) {
      throw new ApiException(ErrorCode.IMAGE_NOT_FOUND);
    }
    await firstValueFrom(
      this.httpSerivce
        .delete<
          string[]
        >(`${this.FILE_URL}/vantahub/pdf/delete`, { data: request })
        .pipe(
          catchError((error) => {
            this.LOGGER.error('Error deleting pdf', error);
            throw error;
          }),
        ),
    );
    await this.pdfRepository.deleteMany(ids);
  }
}
