import { HttpModule } from '@nestjs/axios';
import { Global, Logger, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [PrismaService, Logger],
  exports: [PrismaService, Logger, HttpModule],
})
export class GlobalModule {}
