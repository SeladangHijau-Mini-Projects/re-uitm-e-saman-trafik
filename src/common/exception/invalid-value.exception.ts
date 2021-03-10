import { ValidationException } from './validation.exception';
import { ValidationErrorType } from '../enum/validation-error.enum';
import { ValidationErrorName } from '../enum/error-name/validation-error-name.enum';

export class InvalidValueException extends ValidationException {
    getCode(): number {
        return ValidationErrorType.InvalidValue;
    }

    getName(): string {
        return ValidationErrorName.InvalidValue;
    }
}
