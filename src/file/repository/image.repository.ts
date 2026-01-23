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

  findAll(ids: string[]) {
    return this.prisma.image.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  deleteMany(ids: string[]) {
    return this.prisma.image.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async update(id: string, images: string[]) {
    const existingImages = await this.prisma.image.findMany({
      where: {
        id,
      },
    });
    await this.prisma.image.deleteMany({
      where: {
        id: {
          in: existingImages.map((img) => img.id),
        },
      },
    });
    const result = await this.saveAll(images);
    return result;
  }
}
