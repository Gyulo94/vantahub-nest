import { IsArray, IsOptional, IsString } from 'class-validator';

export class ImageRequest {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString({ each: true })
  images: string[];

  @IsString({ each: true })
  @IsOptional()
  existingImages?: string[];

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
