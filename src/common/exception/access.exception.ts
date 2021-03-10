import { BaseException } from './base.exception';
import { ExceptionErrorType } from '../enum/exception-error.enum';

export abstract class AccessException extends BaseException {
    getType(): ExceptionErrorType {
        return ExceptionErrorType.Access;
    }
}
