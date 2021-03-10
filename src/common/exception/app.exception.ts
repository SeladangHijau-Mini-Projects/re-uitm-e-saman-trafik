import { BaseException } from './base.exception';
import { ExceptionErrorType } from '../enum/exception-error.enum';
import { AppErrorType } from '../enum/app-error.enum';

export abstract class AppException extends BaseException {
    getNamespace(): string {
        return 'app-namespace';
    }

    getType(): ExceptionErrorType {
        return ExceptionErrorType.Exception;
    }

    getCode(): number {
        return AppErrorType.SomethingWentWrong;
    }
}
