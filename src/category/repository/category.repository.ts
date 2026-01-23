import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  save(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data,
    });
  }

  findById(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async findAll(ids?: string[]): Promise<Category[]> {
    const where: Prisma.CategoryWhereInput | undefined = {
      id: ids ? { in: ids } : undefined,
    };

    const result = await this.prisma.category.findMany({ where });
    return result;
  }

  async update(id: string, data: Prisma.CategoryCreateInput) {
    const result = await this.prisma.category.update({
      where: { id },
      data,
    });
    return result;
  }

  deleteMany(ids: string[]) {
    return this.prisma.category.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
