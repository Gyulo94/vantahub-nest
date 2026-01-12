import * as common from '@nestjs/common';
import { ApiException } from '../exception/api.exception';
import { ErrorCodeMap } from '../enum/error-code.enum';

@common.Catch(common.HttpException)
export class HttpExceptionFilter implements common.ExceptionFilter {
  constructor(private readonly logger: common.LoggerService) {}

  catch(exception: common.HttpException, host: common.ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const message = exception.message;

    if (
      status === common.HttpStatus.UNAUTHORIZED ||
      status === common.HttpStatus.NOT_FOUND ||
      status === common.HttpStatus.CONFLICT ||
      status === common.HttpStatus.BAD_REQUEST
    ) {
      this.logger.warn(
        `[CODE : ${status}] [${request.method} : ${request.url}] / [${message}] `,
      );
    } else {
      this.logger.error(
        `[CODE : ${status}] [${request.method} : ${request.url}] / [${message}] `,
      );
    }

    let responseBody: any = {
      statusCode: status,
      message: message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof ApiException) {
      const customErrorCode = exception.getErrorCode();
      const enumDetail = ErrorCodeMap[customErrorCode];
      responseBody.message =
        message || (enumDetail ? enumDetail.message : '알 수 없는 에러');
      responseBody.code = customErrorCode;
    }
    response.status(status).json(responseBody);
  }
}
