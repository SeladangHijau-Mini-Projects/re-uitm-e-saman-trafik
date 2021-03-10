import { ValidationException } from './validation.exception';
import { ValidationErrorType } from '../enum/validation-error.enum';
import { ValidationErrorName } from '../enum/error-name/validation-error-name.enum';

export class ExistsException extends ValidationException {
    getCode(): number {
        return ValidationErrorType.RecordExists;
    }

    getName(): string {
        return ValidationErrorName.RecordExists;
    }
}
