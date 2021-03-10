import { BaseException } from './base.exception';
import { ExceptionErrorType } from '../enum/exception-error.enum';
import { CommonErrorName } from '../enum/error-name/common-error-name.enum';

export abstract class SomethingWentWrongException extends BaseException {
    constructor(exception?: object) {
        super(JSON.stringify(exception));
    }

    getType(): ExceptionErrorType {
        return ExceptionErrorType.Exception;
    }

    getName(): string {
        return CommonErrorName.SomethingWentWrong;
    }
}
