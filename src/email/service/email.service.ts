import Mail = require('nodemailer/lib/mailer');
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ErrorCode } from 'src/global/enum/error-code.enum';
import { ApiException } from 'src/global/exception/api.exception';
import { PrismaService } from 'src/global/prisma/prisma.service';
import * as uuid from 'uuid';
import { RedisService } from 'src/redis/service/redis.service';
import { UserRepository } from 'src/user/repository/user.repository';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private readonly LOGGER = new Logger(EmailService.name);
  private transporter: Mail;

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly userRepository: UserRepository,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async sendVerificationMail(
    email: string,
    type: 'register' | 'reset',
  ): Promise<void> {
    this.LOGGER.log(
      `---------------------이메일 인증 메일 전송 서비스 실행--------------------`,
    );
    this.LOGGER.log(`이메일 인증 메일 전송 요청 받음`);
    const user = await this.userRepository.findByEmail(email);

    if (type === 'register' && user) {
      this.LOGGER.error(`이미 가입된 이메일입니다.`);
      throw new ApiException(ErrorCode.ALREADY_EXIST_EMAIL);
    } else if (type === 'reset' && !user) {
      this.LOGGER.error(`가입되지 않은 이메일입니다.`);
      throw new ApiException(ErrorCode.NOT_FOUND_EMAIL);
    } else if (type === 'reset' && user.provider !== 'EMAIL') {
      this.LOGGER.error(`소셜 로그인 유저는 비밀번호 재설정을 할 수 없습니다.`);
      throw new ApiException(ErrorCode.NOT_ALLOWED_SOCIAL_USER);
    }

    const token = uuid.v4();
    this.LOGGER.log(`1. Redis에 인증 토큰 저장 중...`);
    const value = `${process.env.APP_NAME}:${type}:${email}`;
    this.LOGGER.log(`2. 저장할 값: ${value}`);
    await this.redis.set(token, value, 86400);
    this.LOGGER.log(`3. Redis에 인증 토큰 저장 완료. 만료 시간: 86400초`);

    this.LOGGER.log(`4. 이메일 전송 준비 중...`);
    const url = this.generateUrl(type, token);
    this.LOGGER.log(`5. 생성된 URL: ${url}`);
    const mailOptions = this.generateMailOptions(email, type, url);
    this.LOGGER.log(`6. 이메일 전송 옵션 생성 완료. 이메일 전송 중...`);
    this.LOGGER.log(
      `7. 받는 사람: ${mailOptions.to}, 제목: ${mailOptions.subject}`,
    );
    this.LOGGER.log(`8. 이메일 전송 시작...`);
    await this.transporter.sendMail(mailOptions);
    this.LOGGER.log(`9. 이메일 전송 완료`);
    this.LOGGER.log(
      `---------------------이메일 인증 메일 전송 서비스 종료--------------------`,
    );
  }

  private generateUrl(type: 'register' | 'reset', token: string): string {
    const CLIENT_URL = process.env.CLIENT_URL;
    return type === 'register'
      ? `${CLIENT_URL}/register/${token}`
      : `${CLIENT_URL}/reset-password/${token}`;
  }

  private generateMailOptions(
    email: string,
    type: 'register' | 'reset',
    url: string,
  ): EmailOptions {
    const subject =
      type === 'register'
        ? `${process.env.APP_NAME} - Correo de registro`
        : `${process.env.APP_NAME} - Restablecer Contraseña`;
    const actionText =
      type === 'register' ? 'el registro' : 'el restablecimiento de contraseña';
    const description =
      type === 'register'
        ? 'Por favor, continúe con el registro.'
        : 'Por favor, continúe con el restablecimiento de contraseña.';
    const buttonText =
      type === 'register' ? 'Registrarse' : 'Restablecer Contraseña';

    return {
      to: email,
      subject,
      html: `
        <div style="width: 100%; min-height: 1300px">
          <div
            style="
              text-align: center;
              width: 800px;
              margin: 30px auto;
              padding: 40px 80px;
              border: 1px solid #ededed;
              background: #fff;
              box-sizing: border-box;
            "
          >
            <img
              style="width: 150px"
              src=${process.env.APP_LOGO}
              alt="logo"
            />
            <h1>${process.env.APP_NAME}</h1>
            <p
              style="
                padding-top: 20px;
                font-weight: 700;
                font-size: 20px;
                line-height: 1.5;
                color: #222;
              "
            >
              ${description}
            </p>
            <p
              style="
                font-size: 16px;
                font-weight: 400;
                line-height: 1.5;
                margin-bottom: 40px;
                color: #6a7282;
              "
            >
              Haga clic en el botón de abajo para continuar ${actionText}.
            </p>
            <a href=${url} target=${'_self'} style="background: #404040;text-decoration: none;padding: 10px 24px;font-size: 18px;color: #fff;font-weight: 400;border-radius: 4px;">${buttonText}</a>
          </div>
        </div>
      `,
    };
  }
}
