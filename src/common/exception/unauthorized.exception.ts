import { AccessException } from './access.exception';
import { AccessErrorType } from '../enum/access-error.enum';
import { AccessErrorName } from '../enum/error-name/access-error-name.enum';
export class UnauthorizedException extends AccessException {
    getCode(): number {
        return AccessErrorType.NotAuthorised;
    }

    getName(): string {
        return AccessErrorName.NotAuthorised;
    }
}
