import { AppErrorType } from '../enum/app-error.enum';
import { CommonErrorName } from '../enum/error-name/common-error-name.enum';
import { AppException } from './app.exception';

export class ResourceNotFoundException extends AppException {
    getCode(): number {
        return AppErrorType.ResourceNotFound;
    }

    getName(): string {
        return CommonErrorName.ResourceNotFound;
    }
}
