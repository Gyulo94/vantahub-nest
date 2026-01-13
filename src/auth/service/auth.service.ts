import { Injectable, Logger } from '@nestjs/common';
import { ErrorCode } from 'src/global/enum/error-code.enum';
import { ApiException } from 'src/global/exception/api.exception';
import { RedisService } from 'src/redis/service/redis.service';

@Injectable()
export class AuthService {
  private readonly LOGGER = new Logger(AuthService.name);
  constructor(private readonly redis: RedisService) {}

  async verifyToken(token: string): Promise<string> {
    this.LOGGER.log(
      `--------------------이메일 토큰 검증 서비스 실행--------------------`,
    );
    const value = await this.redis.get(token);
    this.LOGGER.log(
      `1. 토큰이 존재하는가? ${value ? '존재함' : '존재하지 않음'}`,
    );
    if (value) {
      const email = value.split(':')[2];
      this.LOGGER.log(`2. 이메일 토큰 검증 완료, 이메일: ${email}`);
      this.LOGGER.log(
        `--------------------이메일 토큰 검증 서비스 종료--------------------`,
      );
      return email;
    } else {
      this.LOGGER.error(`토큰이 존재하지 않으므로 예외 발생`);
      throw new ApiException(ErrorCode.VERIFICATION_EMAIL_TOKEN_FAILED);
    }
  }
}
