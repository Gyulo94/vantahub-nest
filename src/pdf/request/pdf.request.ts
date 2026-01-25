import { IsArray, IsOptional, IsString } from 'class-validator';

export class PdfRequest {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString({ each: true })
  pdfs: string[];

  @IsString({ each: true })
  @IsOptional()
  existingPdfs?: string[];

  @IsOptional()
  @IsString()
  entity?: string;

  @IsOptional()
  @IsString()
  serviceName?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ids?: string[];
}
