import { BaseException } from './base.exception';
import { ExceptionErrorType } from '../enum/exception-error.enum';
import { CommonErrorName } from '../enum/error-name/common-error-name.enum';
import { AppErrorType } from '../enum/app-error.enum';

export class SomethingWentWrongException extends BaseException {
    constructor(exception?: object) {
        super(JSON.stringify(exception));
    }

    getCode(): number {
        return AppErrorType.SomethingWentWrong;
    }

    getType(): ExceptionErrorType {
        return ExceptionErrorType.Exception;
    }

    getName(): string {
        return CommonErrorName.SomethingWentWrong;
    }
}
