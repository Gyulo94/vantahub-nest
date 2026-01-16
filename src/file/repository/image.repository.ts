import { Injectable } from '@nestjs/common';
import { Image } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class ImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(url: string): Promise<Image> {
    const result = await this.prisma.image.create({
      data: {
        url,
      },
    });
    return result;
  }

  async saveAll(images: string[]): Promise<Image[]> {
    const result = await Promise.all(
      images.map((url) =>
        this.prisma.image.create({
          data: { url },
        }),
      ),
    );
    return result;
  }
}
