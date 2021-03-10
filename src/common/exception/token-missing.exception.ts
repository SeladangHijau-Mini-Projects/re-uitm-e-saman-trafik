import { AccessException } from './access.exception';
import { AccessErrorType } from '../enum/access-error.enum';
import { AccessErrorName } from '../enum/error-name/access-error-name.enum';

export class TokenMissingException extends AccessException {
    getCode(): number {
        return AccessErrorType.MissingToken;
    }

    getName(): string {
        return AccessErrorName.MissingToken;
    }
}
