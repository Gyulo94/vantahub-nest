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

  async findAll(): Promise<Category[]> {
    const result = await this.prisma.category.findMany({});
    return result;
  }
}
