import { Pdf } from '@prisma/client';

export class PdfResponse {
  id: string;
  url: string;
  totalPages?: number;

  static fromModel(pdf?: Pdf & { totalPages?: number }): PdfResponse | null {
    if (!pdf) return null;
    const { id, url, totalPages } = pdf;
    return {
      id,
      url,
      totalPages,
    } as PdfResponse;
  }
}
