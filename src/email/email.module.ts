import { Module } from '@nestjs/common';
import { EmailService } from './service/email.service';
import { RedisModule } from 'src/redis/redis.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [RedisModule, UserModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
