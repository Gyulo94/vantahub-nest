import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ResponseMessage } from 'src/global/enum/response-message.enum';
import { Message } from 'src/global/decorators/message.decorator';
import { UserRequest } from 'src/user/request/user.request';
import { UserResponse } from 'src/user/reponse/user.response';
import { UserService } from 'src/user/service/user.service';
import { EmailService } from 'src/email/service/email.service';

@Controller('auth')
export class AuthController {
  private readonly LOGGER = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Post('register')
  @Message(ResponseMessage.REGISTER_SUCCESS)
  async signup(@Body() request: UserRequest): Promise<UserResponse> {
    this.LOGGER.log(
      '--------------------회원가입 생성 컨트롤러 실행--------------------',
    );
    this.LOGGER.log(`계정 생성 요청 받음`);
    const response: UserResponse = await this.userService.register(request);
    this.LOGGER.log(`계정 생성 완료`);
    this.LOGGER.log(
      '--------------------회원가입 생성 컨트롤러 종료--------------------',
    );
    return response;
  }

  @Get('verify-token')
  async verifyToken(@Query('token') token: string): Promise<string> {
    this.LOGGER.log(
      `--------------------이메일 토큰 검증 컨트롤러 실행--------------------`,
    );
    this.LOGGER.log(`이메일 토큰 검증 요청 받음`);
    const response = await this.authService.verifyToken(token);
    this.LOGGER.log(`이메일 토큰 검증 완료`);
    this.LOGGER.log(
      `--------------------이메일 토큰 검증 컨트롤러 종료--------------------`,
    );
    return response;
  }

  @Post('send-register-email')
  @Message(ResponseMessage.SEND_EMAIL_SUCCESS)
  async sendRegisterEmail(@Body('email') email: string): Promise<void> {
    this.LOGGER.log(
      `--------------------이메일 인증 메일 전송 컨트롤러 실행--------------------`,
    );
    this.LOGGER.log(`이메일 인증 메일 전송 요청 받음`);
    await this.emailService.sendVerificationMail(email, 'register');
    this.LOGGER.log(`이메일 인증 메일 전송 완료`);
    this.LOGGER.log(
      `--------------------이메일 인증 메일 전송 컨트롤러 종료--------------------`,
    );
  }
}
