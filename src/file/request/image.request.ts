import { IsOptional, IsString } from 'class-validator';

export class ImageRequest {
  @IsString()
  id: string;

  @IsString({ each: true })
  images: string[];

  @IsString({ each: true })
  @IsOptional()
  existingImages?: string[];

  @IsOptional()
  @IsString()
  entity?: string;
}
