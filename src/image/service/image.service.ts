import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Image } from '@prisma/client';
import { ImageRepository } from '../repository/image.repository';

@Injectable()
export class ImageService {
  private readonly LOGGER = new Logger(ImageService.name);
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly httpSerivce: HttpService,
  ) {}
  private FILE_URL = process.env.FILE_URL;

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
}
