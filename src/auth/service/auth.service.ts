import { Injectable, Logger } from '@nestjs/common';
import { ErrorCode } from 'src/global/enum/error-code.enum';
import { ApiException } from 'src/global/exception/api.exception';
import { RedisService } from 'src/redis/service/redis.service';
import { AuthRequest } from '../request/auth.request';
import { AuthResponse } from '../response/auth.response';
import { UserResponse } from 'src/user/reponse/user.response';
import { TokenResponse } from '../response/token.response';
import { Payload } from 'src/global/types';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const ACCESS_TOKEN_EXPIRES_IN = parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN);
const REFRESH_TOKEN_EXPIRES_IN = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN);
const EXPIRE_TIME = ACCESS_TOKEN_EXPIRES_IN * 1000;

@Injectable()
export class AuthService {
  private readonly LOGGER = new Logger(AuthService.name);
  constructor(
    private readonly redis: RedisService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(request: AuthRequest): Promise<AuthResponse> {
    this.LOGGER.log(
      `--------------------로그인 서비스 실행-------------------`,
    );

    this.LOGGER.log(`1. 유저 검증 진행`);
    const user: UserResponse = await this.vailidateUser(request);
    this.LOGGER.log(`2. 유저 검증 완료`);
    const payload = {
      id: user.id,
      role: user.role,
    };
    const serverTokens: TokenResponse = await this.generateTokens(payload);
    this.LOGGER.log(`3. JWT 토큰 생성 완료`);

    const response: AuthResponse = AuthResponse.fromModel(user, serverTokens);
    this.LOGGER.log(
      `--------------------로그인 서비스 종료-------------------`,
    );
    return response;
  }

  async refreshToken(user: Payload) {
    this.LOGGER.log(
      `--------------------토큰 재발급 서비스 실행--------------------`,
    );
    this.LOGGER.log(`1. 토큰 재발급 진행`);
    const payload = {
      id: user.id,
      role: user.role,
    };
    const newTokens = await this.generateTokens(payload);
    this.LOGGER.log(`2. 새로운 토큰 생성 완료`);
    this.LOGGER.log(
      `--------------------토큰 재발급 서비스 종료--------------------`,
    );
    return newTokens;
  }

  private async generateTokens(payload: Payload) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  private async vailidateUser(dto: AuthRequest): Promise<UserResponse> {
    this.LOGGER.log(`2. 이메일로 유저 조회`);
    const user: User = await this.userService.findByEmail(dto.email);
    this.LOGGER.log(
      `3. 유저가 존재하는가? ${user ? '존재함' : '존재하지 않음'}`,
    );
    if (!user) {
      this.LOGGER.error(`유저가 존재하지 않으므로 예외 발생`);
      throw new ApiException(ErrorCode.USER_NOT_FOUND);
    }
    if (user && (await bcrypt.compare(dto.password, user.password))) {
      this.LOGGER.log(`4. 비밀번호 일치함`);
      const { password, ...rest } = user;
      return rest;
    } else {
      this.LOGGER.error(`비밀번호가 일치하지 않으므로 예외 발생`);
      throw new ApiException(ErrorCode.INCORRECT_EMAIL_OR_PASSWORD);
    }
  }

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
