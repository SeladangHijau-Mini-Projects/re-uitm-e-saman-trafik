import { BaseException } from './base.exception';
import { ExceptionErrorType } from '../enum/exception-error.enum';

export abstract class ValidationException extends BaseException {
    getType(): ExceptionErrorType {
        return ExceptionErrorType.Validation;
    }
}
