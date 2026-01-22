import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Image } from '@prisma/client';
import { ImageRepository } from '../repository/image.repository';
import { ImageRequest } from '../request/image.request';
import { catchError, firstValueFrom } from 'rxjs';
import { Transactional } from 'src/global/decorators/transactional.decorator';
import { ImageResponse } from '../response/image.response';

@Injectable()
export class ImageService {
  private readonly LOGGER = new Logger(ImageService.name);
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly httpSerivce: HttpService,
  ) {}

  private FILE_URL = process.env.FILE_URL;

  async uploadImage(request: ImageRequest): Promise<string[]> {
    this.LOGGER.log(
      `--------------------이미지 업로드 서비스 실행--------------------`,
    );
    console.log(request);

    this.LOGGER.log(`1. 이미지 업로드 중`);
    const { data: images } = await firstValueFrom(
      this.httpSerivce.post<string[]>(`${this.FILE_URL}/images`, request).pipe(
        catchError((error) => {
          this.LOGGER.error('Error uploading image', error);
          throw error;
        }),
      ),
    );
    this.LOGGER.log(`2. 이미지 업로드 완료`);
    this.LOGGER.log(
      `--------------------이미지 업로드 서비스 종료--------------------`,
    );
    return images;
  }

  async createUserImage(url: string): Promise<Image> {
    let userImage: Image;
    this.LOGGER.log(
      `--------------------이미지 생성 서비스 실행--------------------`,
    );

    if (url && url.includes('lh3.googleusercontent.com')) {
      this.LOGGER.log(`1. 프로필 이미지 생성 중 (일반계정이면 건너뜀)`);
      userImage = await this.imageRepository.save(url);
      this.LOGGER.log(`2. 프로필 이미지 생성 완료`);
      this.LOGGER.log(
        `--------------------이미지 생성 서비스 종료--------------------`,
      );
      return userImage;
    }
  }

  @Transactional()
  async createImages(request: ImageRequest): Promise<ImageResponse[]> {
    const { data: images } = await firstValueFrom(
      this.httpSerivce
        .post<string[]>(`${this.FILE_URL}/vantahub/create`, request)
        .pipe(
          catchError((error) => {
            this.LOGGER.error('Error uploading image', error);
            throw error;
          }),
        ),
    );
    const savedImages = await this.imageRepository.saveAll(images);
    const response: ImageResponse[] = savedImages.map((image) =>
      ImageResponse.fromModel(image),
    );
    return response;
  }

  @Transactional()
  async updateImages(request: ImageRequest): Promise<ImageResponse[]> {
    const { data: images } = await firstValueFrom(
      this.httpSerivce
        .put<string[]>(`${this.FILE_URL}/vantahub/update`, request)
        .pipe(
          catchError((error) => {
            this.LOGGER.error('Error uploading image', error);
            throw error;
          }),
        ),
    );
    const savedImages = await this.imageRepository.saveAll(images);
    const response: ImageResponse[] = savedImages.map((image) =>
      ImageResponse.fromModel(image),
    );
    return response;
  }
}
