import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    success: boolean;
    data: T;
    error: object;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        const contentType = context
            .switchToHttp()
            .getResponse()
            .getHeader('content-type');

        /* eslint-disable */
        return next.handle().pipe(
            map((data: any) => {
                if (
                    contentType &&
                    contentType.indexOf('application/json') === -1
                ) {
                    return data;
                }

                return data && data.success
                    ? data
                    : { success: true, data, error: null };
            }),
        );
        /* eslint-enable */
    }
}
