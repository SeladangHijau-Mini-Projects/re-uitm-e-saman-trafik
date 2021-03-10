import { AccessException } from './access.exception';
import { AccessErrorType } from '../enum/access-error.enum';
import { AccessErrorName } from '../enum/error-name/access-error-name.enum';
export class TokenInvalidException extends AccessException {
    getCode(): number {
        return AccessErrorType.InvalidToken;
    }

    getName(): string {
        return AccessErrorName.InvalidToken;
    }
}
