import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionErrorType } from '../enum/exception-error.enum';

export abstract class BaseException extends HttpException {
    constructor(message?: string) {
        super(message, HttpStatus.OK);
    }

    /**
     * @deprecated will cease after make sure no app is consuming this
     */
    abstract getCode(): number;

    abstract getType(): ExceptionErrorType;

    abstract getName(): string;

    getNamespace(): string {
        return process.env.APP_NAMESPACE || '';
    }

    getResponse(): object {
        return {
            success: false,
            data: null,
            error: {
                name: `${this.getNamespace()}.${this.getName()}`,
                code: this.getCode(),
                type: this.getType(),
                message: this.message,
            },
        };
    }
}
