import {
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    Catch,
} from '@nestjs/common';
import { ExceptionErrorType } from '../enum/exception-error.enum';
import { CommonErrorName } from '../enum/error-name/common-error-name.enum';
import { AppErrorType } from '../enum/app-error.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        if (status === 400) {
            response.status(200).json({
                success: false,
                data: null,
                error: {
                    type: ExceptionErrorType.Exception,
                    name: CommonErrorName.SomethingWentWrong,
                    code: AppErrorType.SomethingWentWrong,
                    message: exception.getResponse()['message'],
                },
            });
        } else {
            response.status(status).json(exception.getResponse());
        }
    }
}
