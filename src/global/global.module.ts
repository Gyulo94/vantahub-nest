import { HttpModule } from '@nestjs/axios';
import { Global, Logger, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisModule } from 'src/redis/redis.module';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [RedisModule, HttpModule],
  providers: [PrismaService, JwtService, Logger],
  exports: [PrismaService, JwtService, Logger, RedisModule, HttpModule],
})
export class GlobalModule {}
